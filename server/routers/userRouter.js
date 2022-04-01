const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.verifyUser, (req, res) => {
  return res.status(200).send('success');
});

router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).send('success');
});
 module.exports = router;