// module
var Home = function(conf){
    this.conf = conf || {};
};
// render see
Home.prototype.see = function(res,object){
    res.render('home_see',object);
};
// render edit
Home.prototype.edit = function(res, object){
    res.render('proceso', object);
};
// export module
module.exports = Home;