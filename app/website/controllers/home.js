
var Neon     = require('neon'),
	//Home     = require('./../models/home'),
	//HomeView = require('./../models/home'),
    self     = {};

var Home = Neon.Class()({
	prototype : {
		init: function(resource, req, argument){
			self.request = resource;
			//self.model   = new Home();
			//self.view    = new HomeView();
			this.exit    = this[resource](argument);
		},
		see: function(argument){
			return('Hello from Worker');
		},
		edit: function(argument){
			return('Hello from Worker');
		}
	}
});

module.exports = Home;