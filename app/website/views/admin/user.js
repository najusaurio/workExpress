// module
var Admin = function(conf){
    this.conf = conf || {};
};
// render see
Admin.prototype.add = function(res,object){
    res.render('admin_user_add',object);
};
// render list
Admin.prototype.list = function(res, object){
    res.render('admin_user_list', object);
};
// export module
module.exports = Admin;