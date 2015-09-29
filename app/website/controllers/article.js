// dependencies
var conf         = require('../../../conf'),
    ArticleView  = require('../views/article'),
    ArticleModel = require('../models/article');
// module
var Article = function(conf){
    this.conf     = conf || {};
    this.view     = new ArticleView();
    this.model    = new ArticleModel();
    this.response = function(){
        this[this.conf.resource](this.conf.req,this.conf.res,this.conf.next);
    };
};
// get see
Article.prototype.getSeeData = function(req, res, next){
    var self = this;
    object = { pagename: 'Article add', userName: 'DiegoUG',  csrfToken: req.csrfToken()};
    this.model.get({slug:req.params.data},function(doc){
        object.article = doc[0];
        self.view.see(res,object);
    });
};
// get list
Article.prototype.getList = function(req, res, next){
    var self = this;
    object = { title: 'Article list'};
    this.model.get({},function(docs){
        object.articles = docs;
        self.view.list(res,object);
    });
};
// export module
module.exports = Article;