const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const port = 3001;

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));



//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express Default Error Handler',
        status: 500,
        message: { err: 'An error occured' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
})


app.listen(port, () => console.log(`CharityApp app listening on port ${port}`));