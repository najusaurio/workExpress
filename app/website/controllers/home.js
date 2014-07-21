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
// post save
Home.prototype.post_save = function(req,res,next){
    res.send('Hello from Worker');
};
// get see
Home.prototype.get_see = function(req,res,next){
    var self = this;
    this.model.get(function(docs){ // consultar del menu
        object = { pagename: 'Home' , userName: 'DiegoUG', docs:docs};
        self.view.see(res,object);
    });
};
// get edit
Home.prototype.get_edit = function(req,res,next){
    var self = this;
    object = { pagename: 'Home' , userName: 'DiegoUG'};
    self.view.see(res,object);
};
// export module
module.exports = Home;