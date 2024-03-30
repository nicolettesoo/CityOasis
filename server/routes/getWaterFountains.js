const express = require('express');
const waterFountainsController = require('../controllers/waterFountainsController')

const router = express.Router()

router.post('/',
    waterFountainsController.getWaterFountains,
    (req, res) => {
        res.status(200).json(res.locals.locations)
    }
)

module.exports = router