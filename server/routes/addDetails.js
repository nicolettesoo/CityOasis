const express = require('express');
const addDetailsController = require('../controllers/addDetailsController')
const sessionController = require('../controllers/sessionController')
const router = express.Router()


router.get('/', 
  sessionController.isLoggedIn,
  (req, res) => {
  return res.sendStatus(200)
});

router.post('/', 
  addDetailsController.insertNotes,
  (req, res) => {
  return res.sendStatus(200)
});

router.put('/', 
  addDetailsController.editNotes,
  (req, res) => {
  return res.sendStatus(200)
});

router.delete('/', 
  addDetailsController.deleteNotes,
  (req, res) => {
  return res.sendStatus(200)
});

module.exports = router