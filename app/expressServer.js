// dependencies
var env          = process.env.NODE_ENV || 'production',
    conf         = require('../conf'),
    express      = require('express'),
    swig         = require('swig'),
    plugins      = require('./plugins/admin'),
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
        new router[controller]({express:this.expressServer});
    }
};
// export module
module.exports = ExpressServer;