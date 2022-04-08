const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');

router.get('/', bankController.getBankInfo, (req, res, next) => {
  return res.json(res.locals.data);
});

module.exports = router;