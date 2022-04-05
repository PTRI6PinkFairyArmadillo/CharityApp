const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.sendStatus(200).send('hello there');
    next()
});

module.exports = router;