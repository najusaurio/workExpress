var Neon            = require('neon'),
	Handler         = require('./lib/handler'),
    express         = require('express');

var Control     = [];
Control.home    = require('./website/controllers/home');
Control.article = require('./website/controllers/article');

var ExpressServer = Neon.Class()({
	prototype : {
		init: function(config){
			config = config || {};
			// create a new express application
			this.httpServer = express();
			// configure express
			this.httpServer.use(express.favicon(__dirname + ("/static/favicon.ico")));
		    // Add a basic route – index page
		    this.httpServer.get('/', function (req, res) {
		        res.send('Hello world!!!');
		    });
		}
	}
});

module.exports = ExpressServer;