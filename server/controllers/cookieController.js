const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    res.cookie(placeholderName, placeholderValue, {
        expires: 0,
        secure: true,

    })
    return next();
}
