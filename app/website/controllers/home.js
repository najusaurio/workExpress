// dependencies
var HomeView     = require('../views/home'),
    HomeModel    = require('../models/home'),
    ArticleModel = require('../models/article');
// module
var Home = function(conf){
    this.conf         = conf || {};
    this.view         = new HomeView();
    this.model        = new HomeModel();
    this.articleModel = new ArticleModel();
    this.response = function(){
        this[this.conf.resource](this.conf.req,this.conf.res,this.conf.next);
    };
};
// get see
Home.prototype.getRoot = function(req,res,next){
    var self = this;
    var object = { pagename: 'Home', userName: 'DiegoUG'};
    self.view.see(res,object);
};
// get edit
Home.prototype.getEdit = function(req,res,next){
    var self = this;
    object = { pagename: 'Home' , userName: 'DiegoUG'};
    self.view.edit(res,object);
};
// export module
module.exports = Home;