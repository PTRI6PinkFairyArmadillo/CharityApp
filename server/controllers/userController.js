const db = require('../models/charityModels');
const path = require('path');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = (req, res, next) => {
  //assume we get username and password from req.body
  //assume that password has been encrypted
  //possible storing more info about the user - first name last name DOB 
  const { fName, lName, username, password } = req.body;

  const newUser = [
    fName,
    lName,
    username,
    password
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
    crypt($4, gen_salt('md5'))
  )
  `;
 

  db.query(query, newUser, (error, response) => {
    if (error) {
      return next({
        //log error
      })
    }
    return next();
  });
};

userController.verifyUser = (req, res, next) => {
	const { username, password } = req.body;
  
  //check if username and password is empty
  
  const query = `
		SELECT
		*
		FROM
		public.users
    WHERE
    username = $1 AND
    password = crypt($2, password)
	`;

//verify password matches password in database
  db.query(query, [username, password], (error, response) => {
      if (error) {
          return next({
              //error msg
          });
      };

      if (!response.rows.length) return next({
        log: `userController.verifyUser: ERROR: No username found`,
      });

      //check response password against password associated w/ provided username
      console.log(response.rows);
      // if (response.rows[0].password === crypt(password, gen_salt('md5'))) return next();
      
      return next();

      //bcrypt compare
      // bcrypt.compare(response.rows[0].password, password, (err, res) => {
      //   if (err) {
      //       return next({
      //           err,
      //           message: 'Error in VERIFY USER bcrypt.compare'
      //       })
      //   }
      //   if (res) {
      //       return next();
      //   } else {
      //       return next({
      //           err,
      //           message: 'Invalid Password'
      //       })
      //   }
      // })

      });
  };
  


userController.signoutUser = (req, res, next) => {

};

userController.signinUser = (req, res, next) => {

};

userController.updateUser = (req, res, next) => {

};

module.exports = userController;
