const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');

router.get('/', bankController.getBankInfo, (req, res) => {
  return res.json(res.locals.data);
});

router.delete('/delete', bankController.deleteUserBank, (req, res) => {
  return res.json(res.locals.success);
});

module.exports = router;