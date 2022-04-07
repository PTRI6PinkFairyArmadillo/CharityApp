require('dotenv').config();
const express = require('express');
const router = express.Router();
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

router.post('/create_link_token', async (req, res) => {
  // const user = await User.find(...);
  // const clientUserId = user.id;
  const config = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'user-id',
    },
    client_name: 'CharityApp',
    products: ['auth', 'transactions'],
    language: 'en',
    country_codes: ['US'],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(config);
    console.log(createTokenResponse.data);
    res.json(createTokenResponse.data);
  } catch (error) {
    console.log(error);
  }
});

router.post('/exchange_public_token', async (req, res) => {
  const publicToken = req.body.public_token;
  // console.log(publicToken);
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;
    console.log(response.data);
    res.json({ accessToken, itemID });
  } catch (error) {
    // handle error
  }

});

router.post('/auth', async (req, res) => {
  const access_token = req.body.accessToken;
  try {
    const authResponse = await client.authGet({
      access_token,
    });
    res.json(authResponse.data);
  } catch (error) {
    //handle error 
    console.log(error);
  }
});

router.post('/transaction', async (req, res) => {
  const access_token = req.body.accessToken;
  try {
    const transResponse = await client.transactionsGet({
      access_token,
      start_date: '2020-02-01',
      end_date: '2022-02-01',
    });
    res.json(transResponse.data);
  } catch (error) {
    //handle error 
    console.log(error);
  }
});

router.post('/id', async (req, res) => {
  const access_token = req.body.accessToken;
  try {
    const idResponse = await client.identityGet({
      access_token,
    });
    res.json(idResponse.data);
  } catch (error) {
    //handle error 
    console.log(error);
  }
});

router.post('/balance', async (req, res) => {
  const access_token = req.body.accessToken;
  try {
    const response = await client.accountsBalanceGet({
      access_token,
    });
    res.json(response.data);
  } catch (error) {
    //handle error 
    console.log(error);
  }
});

router.post('/transfer', async (req, res) => {
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
    res.json(response.data);
  } catch (error) {
    //handle error 
    console.log(error);
  }
});

module.exports = router;