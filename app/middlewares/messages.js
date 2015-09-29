var express = require('express');
var res = express.response;

res.message = function (msg, type) {
    type = type || 'info';
    var sess = this.req.session;
    sess.message = {type: type, string: msg};
};

res.setMessage = function (msg) {
    return this.message(msg, 'error');
};

module.exports = function (req, res, next) {
    res.locals.message = req.session.message || [];
    req.session.message = {};
    next();
};
