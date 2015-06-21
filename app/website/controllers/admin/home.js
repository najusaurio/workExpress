// dependencies
var baseUrl  = '/admin/',
    HomeView = require('../../views/admin/home');
// module
var Admin = function(conf){
    this.conf     = conf || {};
    this.express  = conf.express;
    this.view     = new HomeView();
    this.routes();
};
// routes
Admin.prototype.routes = function(){
    var self = this;
    // root admin
    this.express.get(baseUrl,function(req,res){
        self.view.admin(res,{});
    });
};
// export module
module.exports = Admin;