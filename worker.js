// dependencies
var conf       = require('./conf'),
	mongoose   = require('mongoose'),
	http       = require('http'),
    HttpServer = require('./app/httpServer');

var Worker = function(config){
	config = config || {};
	// conect to database
	mongoose.connect('mongodb://'+conf.db.host+'/' + conf.db.name );
	// create a new server application
	this.app    = new HttpServer();
	this.server = http.createServer(this.app.httpServer);
}

Worker.prototype.run = function(){
	// bind server a port
	this.server.listen(conf.port);
}

module.exports = Worker;

// Been able to run slave as stand alone;
if(module.parent){
	module.exports = Worker;
}else{
	var worker = new Worker();
	worker.run();
	console.log('Running stant alone process');
}