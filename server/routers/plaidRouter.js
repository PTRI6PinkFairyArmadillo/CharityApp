require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const plaidController = require('../controllers/plaidController');

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);

router.post('create_link_token', (req, res) => {
  console.log(req);
  // const user = await User.find(...);
  // const clientUserId = user.id;
  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'clientUserId',
    },
    client_name: 'CharityApp',
    products: ['auth'],
    language: 'en',
    webhook: 'https://webhook.example.com',
    redirect_uri: 'https://domainname.com/oauth-page.html',
    country_codes: ['US'],
  };
  // try {
  //   const createTokenResponse = await client.linkTokenCreate(request);
  //   res.json(createTokenResponse.data);
  // } catch (error) {
  //   console.log(errror);
  // }
});

router.post('/exchange_public_token', async (req, res) => {
  const publicToken = req.body.public_token;
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;
  } catch (error) {
    // handle error
  }
});

module.exports = router;