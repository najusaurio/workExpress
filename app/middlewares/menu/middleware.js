// dependencies
var MenuModel = require('./model/menu');
// plugin
module.exports = function(req, res, next){
    // get all menus
    MenuModel.find({}).exec(function(err, menus){
        res.locals({'menu':'menulocation'});
        // render menus
        next();
    });
};