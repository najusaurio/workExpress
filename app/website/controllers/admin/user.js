// dependencies
var baseUrl  = '/admin/user',
    HomeView = require('../../views/admin/user');
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
    // get add
    this.express.get(baseUrl+'/add/',function(req,res){
        self.view.admin(res,{});
    });
};
// export module
module.exports = Admin;