// dependencies
var HomeView = require('../views/home');
// module
var Home = function(conf){
    var self      = this;
    this.conf     = conf || {};
    this.view     = new HomeView();
    this.response = function(){
        this[self.conf.resource](self.conf.req, self.conf.res, self.conf.next);
    };
};
// resource
Home.prototype.get_see = function(req, res, next){
    object = { pagename: 'Home' , userName: 'DiegoUG'};
    this.view.see(res, object);
};
// export module
module.exports = Home;