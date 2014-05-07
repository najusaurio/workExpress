var HomeView = require('../views/home'),
    Home     = require('../models/home');

var Home = function(resource, req, res, next){
	this.model    = new Home();
	this.view     = new HomeView();
	this.response = this[resource](req, res, next);
}

Home.prototype.get_see = function(req, res, next){
	object = { pagename: 'Swig is fun!' };
	this.view.see(res, object);
}

module.exports = Home;