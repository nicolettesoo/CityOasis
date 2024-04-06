const path = require('path')
var jwt = require('jsonwebtoken')
const db = require('../models/userNotesModels');
const SECRET_KEY = process.env.TOKEN_KEY


const addDetailsController = {};

addDetailsController.insertNotes = (req, res, next) => {
    console.log('I am in insertNotes', req.cookies)
    const {details, fountain_id} = req.body
    const values = [details]
    const response = jwt.verify(req.cookies.authorization, SECRET_KEY)
    const queryString = `INSERT INTO usernotes (username, notes, fountain_id) VALUES ('${response.username}', $1, ${fountain_id})`
    db.query(queryString, values)
    .then(data => {
        return next()
    })
}

addDetailsController.editNotes = (req,res,next) => {
    console.log('i am in editnotes', req.body)
    const response = jwt.verify(req.cookies.authorization, SECRET_KEY)
    const values = [req.body.details]
    const queryString = `UPDATE usernotes SET notes = $1 WHERE fountain_id=${req.body.fountain_id} AND username='${response.username}'`
    db.query(queryString, values)
    .then(data => {
        return next()
    })
}

addDetailsController.deleteNotes = (req,res,next) => {
    console.log('i am in deleteNotes', req.body)
    const response = jwt.verify(req.cookies.authorization, SECRET_KEY)
    const queryString = `DELETE FROM usernotes WHERE fountain_id=${req.body.fountain_id} AND username='${response.username}'`
    db.query(queryString)
    .then(data => {
        return next()
    })
}

module.exports = addDetailsController;