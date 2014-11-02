// dependencies
var favicon = require('serve-favicon'),
    path    = require('path');
// plugin
module.exports = favicon(path.join(__dirname, '../static/favicon.ico'));