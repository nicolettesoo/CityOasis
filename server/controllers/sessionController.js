// const Session = require('../models/sessionModel');
// const User = require('../models/userModel');
const path = require('path')
var jwt = require('jsonwebtoken')


const sessionController = {};
const SECRET_KEY = process.env.TOKEN_KEY


sessionController.startSession = (req, res, next) => {
    //write code here
    console.log('secret key', SECRET_KEY)
    const token = jwt.sign({"username": req.body.username}, SECRET_KEY)
    res.cookie('authorization', token)
    //res.locals.jwtToken = token;
    //res.set({accessToken: token})
    return next()
  };

  sessionController.isLoggedIn = (req,res,next) => {
    console.log('I am requesting cookies', req.cookies)
    try {
        const response = jwt.verify(req.cookies.authorization, SECRET_KEY)
        // console.log('jwt response is: ',response)
        console.log('jwt username is: ',response.username)
        return next()
    }
    catch (err) {
        return next({
        log: 'Error is sessionController.isLoggedIn',
        status: 500,
        message: { err: 'An error occurred' }
    })
  }
}

  sessionController.logoutUser = (req, res, next) => {
    res.clearCookie('authorization');
    return next()
  }
  
  module.exports = sessionController;