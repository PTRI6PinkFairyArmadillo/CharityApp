const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter.js');
const dashboardRouter = require('./routers/dashboardRouter.js');
const plaid = require('plaid');
const port = 3001;

const app = express();
const plaidClient = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.PLAID_ENV
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use('/loginSignUp', userRouter);


//bank connection endpoint
//charity dashboard endpoint (might need separate for charity api)


//404 handler
app.use((req, res) => res.sendStatus(404));

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