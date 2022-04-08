const express = require('express');
const router = express.Router();
const charityAPIController = require('../API/charityAPI')

router.get('/load', charityAPIController.loadCharities, (req, res) => {
    res.status(200).send('success');
});

router.get('/getFromDB', charityAPIController.getCharities, (req, res) => {
    return res.status(200).json(res.locals.charities)
});

module.exports = router;