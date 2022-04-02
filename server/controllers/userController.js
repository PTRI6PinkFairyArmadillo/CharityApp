const db = require('../models/charityModels');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {};
const SALT_WORK_FACTOR = 8;

userController.createUser = (req, res, next) => {
  //assume we get username and password from req.body
  //assume that password has been encrypted
  //possible storing more info about the user - first name last name DOB 
  const { fName, lName, username, plainPassword } = req.body;

  const newUser = [
    fName,
    lName,
    username,
  ];

  const query = `
  INSERT INTO
  public.users
  (
    first_name,
    last_name,
    username,
    password
  )
  VALUES
  (
    $1,
    $2,
    $3,
    $4
  )
  `;

  bcrypt.hash(plainPassword, SALT_WORK_FACTOR, (err, hash) => {
    newUser.push(hash);
    console.log(newUser);
    db.query(query, newUser, (error, response) => {
      if (error) {
        return next({
          //log error
        })
      }
      return next();
    });
  });
};

userController.verifyUser = (req, res, next) => {
  const { username, plainPassword } = req.body;
  //check if username and password is empty

  const query = `
		SELECT
		*
		FROM
		public.users
    WHERE
    username = $1 
	`;

  //verify password matches password in database
  db.query(query, [username], (error, response) => {
    if (error) {
      return next({
        //error msg
      });
    };

    if (!response.rows.length) return next({
      log: `userController.verifyUser: ERROR: No username found`,
    });

    bcrypt.compare(plainPassword, response.rows[0].password, (err, passMatch) => {
      if (err) {
        return next({
          err,
          message: 'Error in VERIFY USER bcrypt.compare'
        })
      }
      if (passMatch) {
        const accessToken = jwt.sign(response.rows[0]._id, process.env.ACCESS_TOKEN_SECRET);
        res.locals.userInfo = response.rows[0];
        res.locals.userInfo.accessToken = accessToken;
        return next();
      }
      else {
        return next({
          err,
          message: 'Invalid Password'
        })
      }
    })
  });
};



userController.signoutUser = (req, res, next) => {

};

userController.signinUser = (req, res, next) => {

};

userController.updateUser = (req, res, next) => {

};

module.exports = userController;
