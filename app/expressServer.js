// dependencies
var env          = process.env.NODE_ENV || 'production',
    conf         = require('../conf'),
    express      = require('express'),
    swig         = require('swig'),
    middlewares  = require('./middlewares/admin'),
    router       = require('./website/router');
// module
var ExpressServer = function(config){
    config = config || {};
    // create a new express application
    this.expressServer = express();
    // middleware's
    for (var middleware in middlewares){
        if (middleware == 'session'){
            this.expressServer.use(config.session);
        } else {
            this.expressServer.use(middlewares[middleware]);
        }
    }
    // config swig as default template engine
    this.expressServer.engine('html', swig.renderFile);
    this.expressServer.set('view engine', 'html');
    this.expressServer.set('views', __dirname + '/website/views/templates');
    swig.setDefaults({ varControls: ['[[', ']]'] });
    // development enviroment
    if (env == 'development') {
        console.log('DEVELOPMENT');
        // disable Swig's cache and use Express's caching instead
        this.expressServer.set('view cache', false);
        swig.setDefaults({ cache: false, varControls: ['[[', ']]'] });
    }
    // dinamic router to controllers
    for (var controller in router){
        for (var resource in router[controller].prototype){
            // variables
            var method      = resource.split('_')[0];
            var environment = resource.split('_')[1];
            var data = resource.split('_')[2];
            data     = (method == 'get' && data !== undefined) ? ':data' : '';
            var url  = ((controller == 'home' && environment == 'see') ? '/' :
                        '/' + controller + '/' + environment + '/' + data);
            // constructor of urls
            this.routers(controller,resource,method,url);
        }
    }
};
// constructor of urls
ExpressServer.prototype.routers = function(controller,resource,method,url){
    console.log(url);
    this.expressServer[method](url, function (req,res,next){
        // encapsulate closure and run controller
        var conf = {
            'resource':resource,
            'req':req,
            'res':res,
            'next':next
        };
        var Controller = new router[controller](conf);
        Controller.response();
    });
};
// export module
module.exports = ExpressServer;