// module
var Admin = function(conf){
    this.conf = conf || {};
};
// render see
Admin.prototype.admin = function(res,object){
    res.render('add_user',object);
};
// export module
module.exports = Admin;