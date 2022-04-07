const db = require('../models/charityModels');
const bankController = {};

bankController.saveBankToDb = (req, res, next) => {
  const { accounts, numbers } = res.locals.data;
  const checkingsSavings = [];

  const queryBank = `
  INSERT INTO
  public.bank_accounts
  (
    account_id,
    account_number,
    bank_name,
    official_name,
    routing,
    wire_routing
  )
  VALUES
  (
    $1,
    $2,
    $3,
    $4,
    $5
  )
  `;

  const queryUserBank = `
    INSERT INTO
    public.user_bank_accounts
    (
      user_id,
      bank_account_id
    )
    VALUES
    (
      $1,
      $2
    )
    `;

  numbers.ach.forEach(element => {
    accounts.forEach(el => {
      if (element.account_id === el.account_id) {
        el.account = element.account;
        el.routing = element.routing;
        el.wire_routing = element.routing;
        checkingsSavings.push(el);
      }
    });
  });

  let newAcc = [];
  checkingsSavings.forEach(el => {
    newAcc = [
      el.account_id,
      el.account,
      el.name,
      el.official_name,
      el.routing,
      el.wire_routing
    ]
      db.query(queryBank, newAcc, (error, dbRes) => {
        
      });
  })

  next();
};







module.exports = bankController;