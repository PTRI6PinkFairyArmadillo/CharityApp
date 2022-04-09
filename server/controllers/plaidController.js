const plaidController = {};
require('dotenv').config();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

plaidController.getLinkToken = async (req, res, next) => {
  const config = {
    user: {
      client_user_id: 'user-id',
    },
    client_name: 'CharityApp',
    products: ['auth', 'transactions'],
    language: 'en',
    country_codes: ['US'],
  };

  try {
    const createTokenResponse = await client.linkTokenCreate(config);
    res.locals.linkToken = createTokenResponse.data;
    console.log(res.locals.linkToken);
    next();
  } catch (error) {
    console.log(error);
    next({
      error
    });
  }
};

plaidController.getAccessToken = async (req, res, next) => {
  const publicToken = req.body.public_token;

  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;
    res.locals.authInfo = { accessToken, itemID };
    console.log(res.locals.authInfo);
    next();
  } catch (error) {
    console.log(error);
    next({
      error
    });
  }
};

plaidController.getBankInfo = async (req, res, next) => {
  const access_token = req.body.accessToken;
  console.log(access_token);
  try {
    const authResponse = await client.authGet({
      access_token,
    });
    res.locals.data = authResponse.data;
    next();
  } catch (error) {
    //handle error 
    console.log(error);
    next({
      error
    });
  }
};

plaidController.getTransactions = async (req, res, next) => {
  const access_token = req.body.accessToken;
  try {
    const transResponse = await client.transactionsGet({
      access_token,
      start_date: '2020-02-01',
      end_date: '2022-02-01',
    });
    res.locals.data = transResponse.data;
    next();
  } catch (error) {
    console.log(error);
    return next({
      error
    })
  }
};

plaidController.getBalance = async (req, res, next) => {
  const access_token = req.body.accessToken;
  try {
    const response = await client.accountsBalanceGet({
      access_token,
    });
    res.locals.data = response.data;
    next();
  } catch (error) {
    //handle error 
    console.log(error);
    next({
      error
    });
  }
};

plaidController.transfer = async (req, res, next) => {
  const access_token = req.body.accessToken;
  const request = {
    type: 'credit',
    network: 'ach',
    amount: '10.00',
    description: 'payment',
    ach_class: 'ppd',
    user: {
      legal_name: 'FirstName LastName',
    },
    access_token,
    idempotency_key: '1223abc456xyz7890001',
    account_id: 'BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp',
    authorization_id: '231h012308h3101z21909sw',
  };
  try {
    const response = await client.accountsBalanceGet(request);
    res.locals.data = response.data;
    next();
  } catch (error) {
    //handle error 
    console.log(error);
    next({
      error
    })
  }
};

module.exports = plaidController;