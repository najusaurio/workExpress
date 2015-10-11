// dependencies
var HomeView = require('../../views/admin/home');
// module
var Admin = function(conf){
    this.conf     = conf || {};
    this.view     = new HomeView();
    this.response = function(){
        this[this.conf.resource](this.conf.req,this.conf.res,this.conf.next);
    };
};
// get see
Admin.prototype.getRoot = function(req,res,next){
    object = { title: 'admin home'};
    this.view.admin(res,object);
};
// export module
module.exports = Admin;