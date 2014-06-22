
var HomeView = require('../views/home');

var Home = function(conf){
    var self      = this;
    this.conf     = conf || {};
    this.view     = new HomeView();
    this.response = function(){
        this[self.conf.resource](self.conf.req, self.conf.res, self.conf.next);
    };
};

Home.prototype.get_see = function(req, res, next){
    object = { pagename: 'Home' , userName: 'DiegoUG'};
    this.view.see(res, object);
};

module.exports = Home;