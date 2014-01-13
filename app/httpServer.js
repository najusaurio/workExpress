// dependencies
var Neon    = require('neon'),
	Handler = require('./core/handler')
    express = require('express');

var ExpressServer = Neon.Class()({
	prototype : {
		init: function(config){
			config = config || {};
			// create a new express application
			this.httpServer = express();
			// configure express
			this.httpServer.use(express.favicon(__dirname + ("/static/favicon.ico")));
			// controller
			this.httpServer.use(function(req, res, next){
				var DataURL    = new Handler(req.url).exit;
				var Controller = require('./' + DataURL[0] + '/controllers/' + DataURL[1]);
				var controller = new Controller(DataURL[2], req, DataURL[3]);
				var exit       = controller.exit
				res.send(exit);
			});
		}
	}
});

module.exports = ExpressServer;