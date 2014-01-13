// dependencies
var Neon = require('neon');

var Master = Neon.Class()({
	prototype : {
		// function to get the cluster and initialize
		init : function(config){
			config       = config || {};
			this.cluster = config.cluster;
		},
		// function to create a worker
		createWorker : function () {
			var worker = this.cluster.fork();
			console.log('worker ' + worker.id + ' started');
		},
		// function when worker dies
		onWorkerExit : function(worker) {
			console.log('worker ' + worker.id + ' died');
			var master = this;
			// recreate the worker after 500 milliseconds
			setTimeout(function(){
				master.createWorker();
			}, 500);
		}
	}
});

module.exports = Master;