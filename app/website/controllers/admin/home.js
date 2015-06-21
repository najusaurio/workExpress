// dependencies
var HomeView = require('../../views/admin/home');
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
    // root
    this.express.get('/admin/',function(req,res){
        self.view.admin(res,{});
    });
};
// export module
module.exports = Admin;