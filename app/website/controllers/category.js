// dependencies
var CategoryView = require('../views/category');
// module
var Category = function(conf){
    this.conf     = conf || {};
    this.view     = new CategoryView();
    this.response = function(){
        this[this.conf.resource](this.conf.req,this.conf.res,this.conf.next);
    };
};
// get see
Category.prototype.get_root = function(req,res,next){
    var self = this;
    var object = { pagename: 'Home', userName: 'DiegoUG'};
    self.view.see(res,object);
};
// export module
module.exports = Category;