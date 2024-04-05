const models = require('../models/userModels');
const bcrypt = require('bcrypt');


const userController = {}

userController.verifyUser = (req, res, next) => {
    const {username, password} = req.body
    models.Users.findOne({username: username})
    .then(result => {
        if (!result) {return next({
          log: 'Could not verify user',
          status: 500,
          message: { err: 'Error in verifyUser'},
        })}
        bcrypt
        .compare (req.body.password, result.password)
        .then(result => {
         if (result == true) {
           return next()
         }
         else if (result == false) {
           //res.redirect('../client/signup.html')
           return next({
            log: 'Incorrect password',
            status: 500,
            message: { err: 'An error occurred'},
           })
         }
        })
        })
        .catch(err => {
         //res.redirect('../client/signup.html')
         return next({
            log: 'Could not verify user',
            status: 500,
            message: { err: 'An error occurred'},
         })
        })
    }

userController.createUser = (req, res, next) => {
    const { username, password } = req.body;
    if (username && password) {
    models.Users.create({
        username: username,
        password: password
      })
      .then((result) => {
        return next()
      })
      .catch(err => next({ error: 'Error in createUser' }))
    }
  };


  

module.exports = userController;
