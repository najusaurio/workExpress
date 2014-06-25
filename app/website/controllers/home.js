// dependencies
var HomeView  = require('../views/home');
var HomeModel = require('../models/home');
// module
var Home = function(conf){
    this.conf     = conf || {};
    this.view     = new HomeView();
    this.model    = new HomeModel();
    this.response = function(){
        this[this.conf.resource](this.conf.req,this.conf.res,this.conf.next);
    };
};
// resource
Home.prototype.get_see = function(req,res,next){
    var self = this;
    this.model['get'](function(docs){
        object = { pagename: 'Home' , userName: 'DiegoUG', docs:docs};
        self.view.see(res, object);
    });
};
// export module
module.exports = Home;