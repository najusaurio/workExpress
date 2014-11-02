// dependencies
var express    = require('express'),
    bodyParser = require('body-parser'),
    expressServer = new express();
// plugin
module.exports = expressServer.use(bodyParser.urlencoded({ extended: true }));