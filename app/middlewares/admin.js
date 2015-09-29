module.exports = {
    bodyparser: require('./bodyparser'),
    cookieparser: require('./cookieparser'),
    session: true,
    csurf: require('./csurf'),
    validatecsrf: require('./validatecsrf'),
    static: require('./static'),
    locals: require('./locals'),
    messages: require('./messages'),
    favicon: require('./favicon'),
    setcookie: require('./setcookie'),
    usersession: require('./session')
};