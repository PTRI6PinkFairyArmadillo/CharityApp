const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    console.log('aaaaaaa')
    res.json({'key' : 'value'})
});

module.exports = router;