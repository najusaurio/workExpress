// dependencies
var conf          = require('./conf'),
    mongoose      = require('mongoose'),
    redis         = require('redis'),
    session       = require('express-session'),
    redisClient   = redis.createClient(conf.redis.port,conf.redis.host),
    RedisStore    = require('connect-redis')(session),
    redisStore    = new RedisStore({ client: redisClient }),
    fs            = require('fs'),
    spdy          = require('spdy'),
    http          = require('http'),
    expressServer = require('./app/expressServer');
// session
var sessionMiddleware = session({
    store: redisStore,
    key: conf.secret,
    secret: conf.secret,
});
// config worker
var Workers = function(config){
    config = config || {};
    // conect to database
    mongoose.connect('mongodb://' + conf.mongoDB.host + '/' + conf.mongoDB.name);
    // create a new server application based on express
    this.app    = new expressServer();
    this.server = http.createServer(this.app.expressServer);
    // spdy https
    // var options = {
    //     key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
    //     cert: fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
    //     // ca: fs.readFileSync(__dirname + '/keys/spdy-ca.pem'),
    //     // **optional** SPDY-specific options
    //     windowSize: 1024 * 1024, // Server's window size
    //     // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
    //     autoSpdy31: false
    // };
    // this.server = spdy.createServer(options, this.app.expressServer);
};
// run worker
Workers.prototype.run = function(){
    // bind server a server port
    this.server.listen(conf.serverPort);
};
// export module
module.exports = Workers;
// Been able to run slave as stand alone;
if(module.parent){
    module.exports = Workers;
}else{
    var worker = new Workers();
    worker.run();
    console.log('Running stant alone process');
}