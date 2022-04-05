const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/logIn', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.userInfo);
});

router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).send('success');
});

router.post('/signout', userController.signoutUser, (req, res) => {
  return res.status(200).send('success');
});
 module.exports = router;