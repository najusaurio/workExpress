var env     = process.env.NODE_ENV || 'development',
    express = require('express'),
    swig    = require('swig'),
    toobusy = require('toobusy'),
    bundles = require('./website/bundles');
// config express
var ExpressServer = function(config){
    config = config || {};
    // create a new express application
    this.expressServer = express();
    // configure express
    this.expressServer.use(express.favicon(__dirname + ("/static/favicon.ico")));
    // impossible load
    this.expressServer.use(function(req, res, next) {
        if (toobusy()) res.send(503, "I'm busy right now, sorry.");
        else next();
    });
    // template engine, default swig
    this.expressServer.engine('html', swig.renderFile);
    this.expressServer.set('view engine', 'html');
    this.expressServer.set('views', __dirname + '/website/templates');
    // development enviroment
    if (env == 'development') {
        // disable Swig's cache and use Express's caching instead
        this.expressServer.set('view cache', false);
        swig.setDefaults({ cache: false });
    }
    // dinamic router to controllers
    for (var controller in bundles){
        for (var action in bundles[controller].prototype){
            // variables
            var resource    = action.split('_')[0];
            var environment = action.split('_')[1];
            var data = (resource == 'get') ? ':data' : '';
            var url  = (controller == 'home') ? '/' : '/' + controller + '/' + environment + '/' + data;
            // constructor of urls
            this.routers(resource, url);
        }
    }
};
// constructor of urls
ExpressServer.prototype.routers = function(resource, url){
    console.log(url);
    this.expressServer[resource](url, function (req, res, next) {
        // variables
        var controller = (req.url == '/') ? 'home' : req.url.split('/')[1];
        var resource   = (req.url == '/') ? 'get_see' : req.method.toLowerCase() + '_' + req.url.split('/')[2];
        // controler
        var Controller = new bundles[controller](resource, req, res, next);
        Controller.response;
    });
};
// export module
module.exports = ExpressServer;