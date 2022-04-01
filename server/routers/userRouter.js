const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.verifyUser, userController.getUser, userController.signinUser, (req, res) => {

});

router.post('/signup', userController.createUser, (req, res) => {

});
