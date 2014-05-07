var Master = function(config){
	config       = config || {};
	this.cluster = config.cluster;
}

Master.prototype.createWorker = function(){ // create a worker
	var worker = this.cluster.fork();
	console.log('worker ' + worker.id + ' started');
}

Master.prototype.onWorkerExit = function(worker){ // when worker dies
	console.log('worker ' + worker.id + ' died');
	var master = this;
	// recreate the worker after 500 milliseconds
	setTimeout(function(){
		master.createWorker();
	}, 500);
}

module.exports = Master;