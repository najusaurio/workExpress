// include the cluster module
var cluster = require('cluster');
// code to run if we're in the master process
if (cluster.isMaster) {
    // start master with the cluster
    var Master   = require('./master');
    var master   = new Master({cluster:cluster});
    // master create a worker for each CPU
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1){
        master.createWorker();
    }
    // listen for dying workers
    cluster.on('exit', function(worker){
        master.onWorkerExit(worker);
    });
// code to run if we're in a worker process
} else {
    // start worker
    var Worker = require('./worker');
    var worker = new Worker();
    worker.run();
    console.log('Worker ' + cluster.worker.id + ' running!');
}