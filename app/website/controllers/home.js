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
    // post save
    this.express.post('/home/save/',function(req,res){
        self.model.get(function(docs){
            if(docs.length === 0){
                req.body.name = 'Home';
                var data = {
                    status: req.body.active,
                    title: req.body.name,
                    slug: req.body.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''),
                    content: req.body.content,
                    description: req.body.description
                };
                self.articleModel.save(data,function(doc){
                    var data = {
                        active: req.body.active,
                        name: req.body.name,
                        $push: { item: {
                            itemName: req.body.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''),
                            type: 'page',
                            page: doc._id
                        } },
                        location: 'home'
                    };
                    self.model.save({name:'Home'},data,function(doc){
                        res.redirect('/');
                    });
                });
            }
        });
    });
    // get edit
    this.express.get('/home/edit/',function(req,res){
        object = { pagename: 'Home' , userName: 'DiegoUG'};
        self.view.edit(res,object);
    });

};
// export module
module.exports = Home;