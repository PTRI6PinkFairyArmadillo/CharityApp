require('dotenv').config();
const express = require('express');
const router = express.Router();
const plaidController = require('../controllers/plaidController');
const bankController = require('../controllers/bankController');

router.post('/create_link_token',
  plaidController.getLinkToken,
  (req, res) => {
    return res.json(res.locals.linkToken);
  });

router.post('/exchange_public_token',
  plaidController.getAccessToken,
  (req, res) => {
    return res.json(res.locals.authInfo);
  });

router.post('/auth',
  plaidController.getBankInfo,
  bankController.saveBankToDb,
  (req, res) => {
    return res.json(res.locals.data);
  });

router.post('/transaction',
  plaidController.getTransactions,
  (req, res) => {
    return res.json(res.locals.data);
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

router.post('/balance',
  plaidController.getBalance,
  (req, res) => {
    return res.json(res.locals.data);
  });

router.post('/transfer', async (req, res) => {
  //not used
});

module.exports = router;