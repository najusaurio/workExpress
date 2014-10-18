// dependencies
var toobusy = require('toobusy');
// plugin: impossible load
module.exports = function(req, res, next){
    if (toobusy()) res.send(503, "I'm busy right now, sorry.");
    else next();
};