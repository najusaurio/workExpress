module.exports = {
    bodyparser: require('./bodyparser'),
    cookieparser: require('./cookieparser'),
    session: true,
    csurf: require('./csurf'),
    validatecsrf: require('./validatecsrf'),
    static: require('./static'),
    locals: require('./locals'),
    toobusy: require('./toobusy'),
    favicon: require('./favicon'),
    setcookie: require('./setcookie')
};