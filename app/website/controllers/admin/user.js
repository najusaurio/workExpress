// dependencies
var baseUrl   = '/admin/user',
    UserView  = require('../../views/admin/user'),
    UserModel = require('../../models/user');
// module
var User = function(conf){
    this.conf     = conf || {};
    this.express  = conf.express;
    this.view     = new UserView();
    this.model    = new UserModel();
    this.response = function(){
        this[this.conf.resource](this.conf.req,this.conf.res,this.conf.next);
    };
};
// post save
User.prototype.postSave = function(req, res, next){
    debugger;
    var self = this;
    var action = req.body.action;
    delete req.body.action;
    if (action == 'add') {
        this.model.get({username: req.body.username},function(doc){
            if (!doc[0]) {
                self.model.save(req.body, function () {
                    res.setMessage("The user " + req.body.username + " has been created successfully.");
                    res.redirect('/admin/user/list/');
                });
            } else {
                res.setMessage("Username "+ req.body.username +" already taken!");
                res.redirect('back');
            }
        });
    } else if (action == 'update') {
        self.model.save(req.body, function (doc) {
            res.setMessage("The user " + req.body.username + " has been updated successfully.");
            res.redirect('/admin/user/see/' + doc.id);
        });
    }
};
// remove
User.prototype.postRemove = function(req, res, next){
    if(!(req.session.sessionUser._id.toString() == req.body._id)){
        this.model.remove(req.body,function(){
            res.redirect('/admin/user/list/');
        });
    } else {
        res.setMessage("Your user cant be deleted");
        res.redirect('/admin/user/list/');
    }
};
// add
User.prototype.getAdd = function(req, res, next){
    var self = this;
    object = { title: 'User add', action:'add', csrfToken: req.csrfToken()};
    self.view.add(res,object);
};
// see
User.prototype.getSeeData = function(req, res, next){
    var self = this;
    object = { title: 'User see', csrfToken: req.csrfToken()};
    this.model.getById(req.params.data,function(docs){
        object.user = docs;
        self.view.add(res,object);
    });
};
// edit
User.prototype.getEditData = function(req, res, next){
    var self = this;
    object = { title: 'User edit', action:'update', csrfToken: req.csrfToken()};
    this.model.getById(req.params.data,function(docs){
        object.user = docs;
        self.view.add(res,object);
    });
};
// list
User.prototype.getList = function(req, res, next){
    var self = this;
    object = { title: 'User list'};
    this.model.get({},function(docs){
        object.users = docs;
        self.view.list(res,object);
    });
};
// export module
module.exports = User;