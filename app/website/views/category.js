// module
var Category = function(conf){
    this.conf = conf || {};
};
// render see
Category.prototype.see = function(res,object){
    res.render('category',object);
};
// export module
module.exports = Category;