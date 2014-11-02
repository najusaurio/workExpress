var conf          = require('../../conf'),
    session       = require('express-session'),
    sessionStore  = new session.MemoryStore();

module.exports = session({ secret: conf.secret, store: sessionStore });