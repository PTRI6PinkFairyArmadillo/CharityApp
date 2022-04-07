const express = require('express');
const router = express.Router();
const charityAPIController = require('../API/charityAPI')

router.get('/', charityAPIController.getCharities, (req, res) => {
    res.status(200).send('success');
});

module.exports = router;