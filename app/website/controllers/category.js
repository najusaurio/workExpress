// dependencies
var CategoryView = require('../views/category');
// module
var Category = function(conf){
    this.conf     = conf || {};
    this.express  = conf.express;
    this.view     = new CategoryView();
    this.routes();
};
Category.prototype.routes = function(){
    var self = this;
    // root
    this.express.post('/category/',function(req,res){
        var object = { pagename: 'Home', userName: 'DiegoUG'};
        self.view.see(res,object);
    });
};
// export module
module.exports = Category;