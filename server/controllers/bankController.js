const db = require('../models/charityModels');
const jwt = require('jsonwebtoken');
const bankController = {};

bankController.saveBankToDb = async (req, res, next) => {
  const { accounts, numbers } = res.locals.data;
  const decodedId = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET);
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
    $5,
    $6
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

  const queryBankId = `
  SELECT 
  _id
  FROM
  public.bank_accounts
  WHERE
  account_id = $1
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
  for (const el of checkingsSavings) {
    newAcc = [
      el.account_id,
      el.account,
      el.name,
      el.official_name,
      el.routing,
      el.wire_routing
    ]
    try {
      const resp = await db.query(queryBank, newAcc);
      const id = await db.query(queryBankId, [newAcc[0]])
      const userBank = await db.query(queryUserBank, [decodedId, id.rows[0]._id]);
    } catch (error) {
      console.log(error);
    }
  };
  return next();
};

bankController.getBankInfo = async (req, res, next) => {
  const decodedId = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET);

  const query = `
  SELECT
  j.*, b.*
  FROM
  public.user_bank_accounts j
  JOIN
  public.bank_accounts b
  ON
  j.bank_account_id = b._id
  WHERE
  j.user_id = $1
  `;

  try {
    const response = await db.query(query, [decodedId]);
    res.locals.data = response.rows;
    next();
  } catch (error) {
    console.log(error);
  };
};

bankController.deleteUserBank = async (req, res, next) => {
  const decodedId = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET);

  const query = `
  DELETE FROM
  public.user_bank_accounts
  WHERE
  user_id = $1
  `;

  try {
    const response = await db.query(query, [decodedId])
  } catch (error) {
    console.log(error);
  }
};

module.exports = bankController;