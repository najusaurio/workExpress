
var HomeView = require('../views/home');

var Home = function(resource, req, res, next){
    this.view     = new HomeView();
    this.response = this[resource](req, res, next);
};

Home.prototype.get_see = function(req, res, next){
    object = { pagename: 'Home' , userName: 'DiegoUG'};
    this.view.see(res, object);
};

module.exports = Home;