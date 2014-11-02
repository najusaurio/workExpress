// dependencies
var MenuModel = require('../website/models/schema/menu');
// plugin
module.exports = function(req, res, next){
    // get all menus
    MenuModel.find({}).populate('item.page').exec(function(err, menus){
        res.locals.menu = {'menu':'menulocation'};
        next();
    });
};