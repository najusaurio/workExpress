// module
var Admin = function(conf){
    this.conf = conf || {};
};
// render see
Admin.prototype.admin = function(res,object){
    res.render('admin_base',object);
};
// export module
module.exports = Admin;