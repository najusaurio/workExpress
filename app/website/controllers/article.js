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
// post save
Article.prototype.post_save = function(req, res, next){
    if (req.body.key != conf.tmpKey.secret){
        res.redirect('/article/list/');
    } else {
        this.model.save(req.body,function(doc){
            res.redirect('/article/see/'+doc.slug);
        });
    }
};
// post remove
Article.prototype.post_remove = function(req, res, next){
    this.model.remove(req.body,function(doc){
        res.redirect('/article/list/');
    });
};
// get add
Article.prototype.get_add = function(req, res, next){
    var self = this;
    object = { pagename: 'Article add', userName: 'DiegoUG', csrfToken: req.csrfToken()};
    self.view.add(res,object);
};
// get see
Article.prototype.get_see_data = function(req, res, next){
    var self = this;
    object = { pagename: 'Article add', userName: 'DiegoUG',  csrfToken: req.csrfToken()};
    this.model.get({slug:req.params.data},function(doc){
        object.article = doc[0];
        self.view.see(res,object);
    });
};
// get edit
Article.prototype.get_edit_data = function(req, res, next){
    var self = this;
    object = { pagename: 'Article edit', userName: 'DiegoUG'};
    this.model.get({slug:req.params.data},function(doc){
        object.article = doc[0];
        self.view.add(res,object);
    });
};
// get list
Article.prototype.get_list = function(req, res, next){
    var self = this;
    object = { pagename: 'Article list', userName: 'DiegoUG'};
    this.model.get({},function(docs){
        object.articles = docs;
        self.view.list(res,object);
    });
};
// export module
module.exports = Article;