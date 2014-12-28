// dependencies
var conf          = require('./conf'),
    mongoose      = require('mongoose'),
    redis         = require('redis'),
    session       = require('express-session'),
    redisClient   = redis.createClient(conf.redis.port,conf.redis.host),
    RedisStore    = require('connect-redis')(session),
    redisStore    = new RedisStore({ client: redisClient }),
    fs            = require('fs'),
    http          = require('http'),
    expressServer = require('./app/expressServer'),
    socketIO      = require('./app/socketIO');
// session
var sessionMiddleware = session({
    store: redisStore,
    key: conf.secret,
    secret: conf.secret
});
// config worker
var Workers = function(config){
    config = config || {};
    // conect to database
    mongoose.connect('mongodb://' + conf.mongoDB.host + '/' + conf.mongoDB.name);
    // create server application
    this.app    = new expressServer({session:sessionMiddleware});
    this.server = http.Server(this.app.expressServer);
    this.Io     = new socketIO({server:this.server,redisStore:redisStore});
    // spdy https
    // spdy = require('spdy')
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
    this.server.listen(conf.serverPort);
    this.Io.run();
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