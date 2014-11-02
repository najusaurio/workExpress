module.exports = {
    cookieparser: require('./cookieparser'),
    session: true,
    csurf: require('./csurf'),
    validatecsrf: require('./validatecsrf'),
    static: require('./static'),
    locals: require('./locals'),
    toobusy: require('./toobusy'),
    favicon: require('./favicon'),
    setcookie: require('./setcookie'),
    bodyparser: require('./bodyparser')
};