// module
var Login = function(conf){
    this.conf = conf || {};
};
// render login
Login.prototype.login = function(res, object){
    res.render('login', object);
};
// export module
module.exports = Login;