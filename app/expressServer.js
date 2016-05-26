// dependencies
var env = process.env.NODE_ENV || 'production',
    conf = require('../conf'),
    express = require('express'),
    swig = require('swig'),
    plugins = require('./plugins/admin'),
    middlewares = require('./middlewares/admin'),
    router = require('./website/router');

var noAuth = function (req, res, next) { return next() },
    auth = require('./middlewares/auth');

// module
var ExpressServer = function (config) {
    config = config || {};
    // create a new express application
    this.expressServer = express();
    // middleware's
    for (var middleware in middlewares) {
        if (middleware == 'session') {
            this.expressServer.use(config.session);
        } else {
            this.expressServer.use(middlewares[middleware]);
        }
    }
    // config swig as default template engine
    this.expressServer.engine('html', swig.renderFile);
    this.expressServer.set('view engine', 'html');
    this.expressServer.set('views', [__dirname + '/website/views/templates', __dirname + '/website/views/admin/templates']);
    // development enviroment
    if (env == 'development') {
        console.log('DEVELOPMENT');
        // disable Swig's cache and use Express's caching instead
        this.expressServer.set('view cache', false);
        swig.setDefaults({cache: false});
    }
    // dinamic router to controllers
    for (var controller in router) {
        for (var resource in router[controller].prototype) {
            var urlResource = resource.replace(/([a-z\d])([A-Z])/g, '$1' + '-' + '$2').toLowerCase(),
                urlController = controller.replace(/([a-z\d])([A-Z])/g, '$1' + '/' + '$2').toLowerCase(),
                method = urlResource.split('-')[0],
                environment = urlResource.split('-')[1],
                data = (method == 'get' && urlResource.split('-')[2] == 'data') ? ':data' : '';
            var url = ((urlController == 'home' && environment == 'root') ? '/' :
                        environment == 'root' ? '/' + urlController + '/' :
                        urlController == 'admin/login' ? '/' + environment + '/' :
                        '/' + urlController + '/' + environment + '/' + data);
            var needAuth = url.indexOf('admin') >= 0;
            // constructor of urls
            this.routers(plugins, controller, resource, method, url, needAuth);
        }
    }
};
// constructor of urls
ExpressServer.prototype.routers = function (plugins, controller, resource, method, url, needAuth) {
    console.log(method + ':' + url);
    var requestMiddleware = needAuth? auth :noAuth;
    this.expressServer[method](url, requestMiddleware, function (req, res, next) {
        var conf = {
            'plugins': plugins,
            'resource': resource,
            'req': req,
            'res': res,
            'next': next
        };
        var Controller = new router[controller](conf);
        Controller.response();
    });
};
// export module
module.exports = ExpressServer;