// dependencies
var bcrypt = require('bcrypt'),
    conf = require('../../../../conf'),
    LoginView = require('../../views/admin/login'),
    UserModel = require('../../models/user');
// module
var Login = function (conf) {
    this.conf = conf || {};
    this.view = new LoginView();
    this.model = new UserModel();
    this.response = function () {
        this[this.conf.resource](this.conf.req, this.conf.res, this.conf.next);
    };
};
// post login
Login.prototype.postLogin = function (req, res, next) {
    this.model.get({username: req.body.username}, function (users) {

        if (users[0]) {
            var user = users[0];
            bcrypt.hash(req.body.password, user.salt, function (err, hash) {
                if (err) return next(err);
                if (hash == user.password) {
                    req.session.uid = user._id;
                    res.redirect('/admin/');
                } else {
                    res.setMessage("Password to user " + req.body.username + " not match");
                    res.redirect('back');
                }
            });
        } else {
            res.setMessage("Username " + req.body.username + " not exist!");
            res.redirect('back');
        }
    });
};
// get login
Login.prototype.getLogin = function (req, res, next) {
    object = {title: 'Login', csrfToken: req.csrfToken()};
    if (req.sessionUser || res.locals.sessionUser){
        res.redirect('/admin/');
    }else{
        this.view.login(res, object);
    }
};
// get logout
Login.prototype.getLogout = function (req, res, next) {
    req.session.destroy(function (err) {
        delete res.locals.sessionUser;
        if (err) throw err;
        res.redirect('/');
    });
};
// export module
module.exports = Login;