// dependencies
var HomeView     = require('../views/home'),
    HomeModel    = require('../models/home'),
    ArticleModel = require('../models/article');
// module
var Home = function(conf){
    this.conf         = conf || {};
    this.view         = new HomeView();
    this.model        = new HomeModel();
    this.articleModel = new ArticleModel();
    this.response = function(){
        this[this.conf.resource](this.conf.req,this.conf.res,this.conf.next);
    };
};
// post save
Home.prototype.post_save = function(req,res,next){
    var self = this;
    this.model.get(function(docs){
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
};
// get see
Home.prototype.get_see = function(req,res,next){
    var self = this;
    var object = { pagename: 'Home', userName: 'DiegoUG'};
    self.view.see(res,object);
    //this.model.get(function(doc){
    //    if(doc.length === 0){
    //        res.redirect('/home/edit/');
    //    } else {
    //        object = { pagename: 'Home', userName: 'DiegoUG', docs:doc};
    //        self.view.see(res,object);
    //    }
    //});
};
// get edit
Home.prototype.get_edit = function(req,res,next){
    var self = this;
    object = { pagename: 'Home' , userName: 'DiegoUG'};
    self.view.edit(res,object);
};
// export module
module.exports = Home;