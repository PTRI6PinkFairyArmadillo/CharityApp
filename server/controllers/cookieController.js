const cookieController = {};
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());

cookieController.setSSIDCookie = (req, res, next) => {
    res.cookie('ssid', res.locals.userId, {
        httpOnly: true,
        expires: new Date(Date.now() + 50000),
    });
    return next();
}
