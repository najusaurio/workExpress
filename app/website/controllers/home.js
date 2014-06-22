// dependencies
var HomeView  = require('../views/home');
var HomeModel = require('../models/home');
// module
var Home = function(conf){
    var self      = this;
    this.conf     = conf || {};
    this.view     = new HomeView();
    this.model    = new HomeModel();
    this.response = function(){
        this[self.conf.resource](self.conf.req,self.conf.res,self.conf.next);
    };
};
// resource
Home.prototype.get_see = function(req, res, next){
    var self = this;
    this.model['get'](function(docs){
        object = { pagename: 'Home' , userName: 'DiegoUG', docs:docs};
        self.view.see(res, object);
    });
};
// export module
module.exports = Home;