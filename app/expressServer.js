var env     = process.env.NODE_ENV || 'development';
    express = require('express'),
    swig    = require('swig'),
    bundles = require('./website/bundles');
// config express
var ExpressServer = function(config){
	config = config || {};
	// create a new express application
	this.expressServer = express();
	// configure express
	this.expressServer.use(express.favicon(__dirname + ("/static/favicon.ico")));
	// template engine, default swig
	this.expressServer.engine('html', swig.renderFile);
	this.expressServer.set('view engine', 'html');
	this.expressServer.set('views', __dirname + '/website/templates');
	if (env == 'development') {
		// disable Swig's cache and use Express's caching instead
		this.expressServer.set('view cache', false);
		swig.setDefaults({ cache: false });
	}
	// router home
	this.expressServer.get('/', function (req, res, next) {
		var controller = new bundles['home']('get_see', req, res, next);
		controller.response;
	});
	// router to controllers
	for (var Controller in bundles){
		for (var Action in bundles[Controller].prototype){
			var resource    = Action.split('_')[0];
			var environment = Action.split('_')[1];
			this.expressServer[resource]('/'+Controller+'/'+environment, function (req, res, next) {
				var controller = req.url.split('/')[1];
				var resource   = req.method.toLowerCase()+'_'+req.url.split('/')[2];
				var controller = new bundles[controller](resource, req, res, next);
				controller.response;
			});
		}
	}
}
// export module
module.exports = ExpressServer;