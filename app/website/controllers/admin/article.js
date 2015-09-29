// dependencies
var conf         = require('../../../../conf'),
    ArticleView  = require('../../views/admin/article'),
    ArticleModel = require('../../models/article');
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
Article.prototype.postSave = function(req, res, next){
    this.model.save(req.body,function(){
        res.redirect('/admin/article/edit/'+req.body.slug);
    });
};
// post remove
Article.prototype.postRemove = function(req, res, next){
    this.model.remove(req.body,function(){
        res.redirect('/admin/article/list/');
    });
};
// get add
Article.prototype.getAdd = function(req, res, next){
    object = { pagename: 'Article add', userName: 'DiegoUG', csrfToken: req.csrfToken()};
    this.view.add(res,object);
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
// get edit
Article.prototype.getEditData = function(req, res, next){
    var self = this;
    object = { pagename: 'Article edit', userName: 'DiegoUG',  csrfToken: req.csrfToken()};
    this.model.get({slug:req.params.data},function(doc){
        object.article = doc[0];
        self.view.add(res,object);
    });
};
// get list
Article.prototype.getList = function(req, res, next){
    //this.conf.plugins.nodemailer.sendMail();
    var self = this;
    object = { pagename: 'Article list', userName: 'DiegoUG'};
    this.model.get({},function(docs){
        object.articles = docs;
        self.view.list(res,object);
    });
};
// export module
module.exports = Article;