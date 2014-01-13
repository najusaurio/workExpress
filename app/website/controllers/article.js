var Neon = require('neon');

var Article = Neon.Class()({
	prototype : {
		init: function(config){
			config = config || {};
		},
		save: function(req, res, next){
			res.send('Hello from Worker');
		},
		add: function(req, res, next){
			res.send('Hello from Worker');
		},
		see: function(req, res, next){
			res.send('Hello from Worker');
		},
		edit: function(req, res, next){
			res.send('Hello from Worker');
		},
		remove: function(req, res, next){
			res.send('Hello from Worker');
		},
		list: function(req, res, next){
			res.send('Hello from Worker');
		}
	}
});

module.exports = Article;