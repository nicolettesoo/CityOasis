const express = require("express");
const app = express();
const path = require('path');
const webpack = require('../webpack.config')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
require("dotenv").config()


const getWaterFountainsRouter = require('./routes/getWaterFountains.js')
const addDetails = require('./routes/addDetails.js')
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');

app.use(express.json())
app.use(cookieParser())


app.post('/login', 
  userController.verifyUser,
  sessionController.startSession,
  (req, res) => {
  console.log('I logged in');
  return res.sendStatus(200)
});

app.get('/isLoggedIn', 
  sessionController.isLoggedIn,
  (req, res) => {
  console.log('log in verified');
  return res.sendStatus(200)
});

app.post('/signup', 
  userController.createUser,
  sessionController.startSession,
  (req, res) => {
  console.log('I logged in');
  return res.sendStatus(200)
});

app.get('/logout',
  sessionController.logoutUser,
  (req, res) => {
  console.log('I logged out');
  return res.sendStatus(200)
});

app.use('/client/',express.static(path.join(__dirname, '../client')));
app.use('/getWaterFountains', getWaterFountainsRouter)
app.use('/addDetails', addDetails)


if (webpack.mode != "development") {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, '../index.html'))
    }) 
    // app.use("/client/stylesheets/",(req, res) => {
    //     return res.status(200).sendFile(path.resolve(__dirname, '../client/stylesheets/styles2.css'))
    // })
    // app.use("/client/stylesheets/background",(req, res) => {
    //     return res.status(200).sendFile(path.resolve(__dirname, '../client/stylesheets/background.jpeg'))
    // })
}

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
  });


app.listen(3000, () => {console.log('listening on port 3000')})