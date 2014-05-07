var handler = require('./lib/handler'),
    express = require('express'),
    bundles = require('./website/controllers/bundles');

var ExpressServer = function(config){
	config = config || {};
	// create a new express application
	this.httpServer = express();
	// configure express
	this.httpServer.use(express.favicon(__dirname + ("/static/favicon.ico")));
	// Router to controllers
	for (var i in bundles){
		for (var j in bundles[i].prototype){
			var resource    = j.split('_')[0];
			var environment = j.split('_')[1];
			this.httpServer[resource]('/'+i+'/'+environment, function (req, res, next) {
				var controller = req.url.split('/')[1];
				var resource   = req.method.toLowerCase()+'_'+req.url.split('/')[2];
				var controller = new bundles[controller](resource, req, next);
				var exit       = controller.exit;
				res.send(exit);
				//bundles[controller].prototype[resource](req, res, next);
			});
		}
	}
}

module.exports = ExpressServer;