// dependencies
var HomeView     = require('../views/home'),
    HomeModel    = require('../models/home'),
    ArticleModel = require('../models/article');
// module
var Home = function(conf){
    this.conf         = conf || {};
    this.express      = conf.express;
    this.view         = new HomeView();
    this.model        = new HomeModel();
    this.articleModel = new ArticleModel();
    this.routes();
};
Home.prototype.routes = function(){
    var self = this;
    // get root
    this.express.get('/',function(req,res){
        var object = { pagename: 'Home', userName: 'DiegoUG'};
        self.view.see(res,object);
    });
};
// export module
module.exports = Home;