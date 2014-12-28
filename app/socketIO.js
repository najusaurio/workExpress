// dependencies
var Io           = require('socket.io'),
    conf         = require('../conf'),
    Cookie       = require('cookie'),
    CookieParser = require('cookie-parser');
// module
var SocketIO = function(config){
    this.config      = config || {};
    this.redisStore  = config.redisStore;
    this.io          = Io.listen(config.server);
};
// run socket && redis
SocketIO.prototype.run = function(){
    var self = this;
    // set auth
    this.io.use(function(socket, next) {
       var data = socket.request;
       self.auth(data, next);
    });
    // when a client connects
    this.io.sockets.on('connection', function(socket){
        // send to events
        self.events(socket);
    });
};
// on connect
SocketIO.prototype.events = function(socket){
    //socket.on('other:event', function(data){
    //    console.log(data);
    //});
};
// authentication
SocketIO.prototype.auth = function(data, next){
    var self = this;
    // see if the data has headers
    if (!data.headers || !data.headers.cookie || !data.headers.origin) {
        next(new Error('Not Authorized.'));
    }
    // get cookie
    var cookie = Cookie.parse(data.headers.cookie);
    if (!cookie['connect.sid']) {
        console.log('Error => No connect.sid');
        next(new Error('Not Authorized.'));
    }
    data.cookie = Cookie.parse(data.headers.cookie);
    data.cookie = CookieParser.signedCookies(data.cookie,conf.secret);
    // redis validation
    self.redisStore.load(data.cookie['connect.sid'], function (err, session){
        console.log(session, err); // both return undefined
        if (err || !session) {
            // invalid session identifier
            next(new Error('Not Authorized'));
        } else {
            data.session = session;
            next();
        }
    });
};
// export module
module.exports = SocketIO;