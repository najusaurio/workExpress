// dependencies
var env       = process.env.NODE_ENV || 'development',
    path      = require('path'),
    express   = require('express'),
    swig      = require('swig'),
    toobusy   = require('toobusy'),
    bundles   = require('./website/bundles');
// module
var ExpressServer = function(config){
    config = config || {};
    // create a new express application
    this.expressServer = express();
    // middleware's
    this.expressServer.use(express.favicon(__dirname + ('/static/favicon.ico')));
    this.expressServer.use(express.static(path.join(__dirname, '/static/')));
    this.expressServer.use(function(req, res, next) { // impossible load
        if (toobusy()) res.send(503, "I'm busy right now, sorry.");
        else next();
    });
    // config swig as default template engine
    this.expressServer.engine('html', swig.renderFile);
    this.expressServer.set('view engine', 'html');
    this.expressServer.set('views', __dirname + '/website/templates');
    swig.setDefaults({ varControls: ['[[', ']]'] });
    // development enviroment
    if (env == 'development') {
        // disable Swig's cache and use Express's caching instead
        this.expressServer.set('view cache', false);
        swig.setDefaults({ cache: false, varControls: ['[[', ']]'] });
    }
    // dinamic router to controllers
    for (var controller in bundles){
        for (var resource in bundles[controller].prototype){
            // variables
            var method      = resource.split('_')[0];
            var environment = resource.split('_')[1];
            var data = (method == 'get') ? ':data' : '';
            var url  = (controller == 'home') ? '/' : '/' + controller + '/' + environment + '/' + data;
            // constructor of urls
            this.routers(controller,resource,method,url);
        }
    }
};
// constructor of urls
ExpressServer.prototype.routers = function(controller,resource,method,url){
    console.log(url);
    this.expressServer[method](url, function (req,res,next){
        // encapsulate closure
        (function(controller, resource){
            // controler
            var conf = {'resource':resource,'req':req,'res':res,'next':next};
            var Controller = new bundles[controller](conf);
            Controller.response();
        })(controller, resource);
    });
};
// export module
module.exports = ExpressServer;