// dependencies
var baseUrl      = '/article',
    conf         = require('../../../conf'),
    ArticleView  = require('../views/article'),
    ArticleModel = require('../models/article');
// module
var Article = function(conf){
    this.conf     = conf || {};
    this.express  = conf.express;
    this.view     = new ArticleView();
    this.model    = new ArticleModel();
    this.routes();
};
Article.prototype.routes = function(){
    var self = this;
    // post save
    this.express.post(baseUrl+'/save/',function(req,res){
        if (req.body.key != conf.tmpKey.secret){
            res.redirect('/article/list/');
        } else {
            self.model.save(req.body,function(doc){
                res.redirect('/article/see/'+doc.slug);
            });
        }
    });
    // post remove
    this.express.post(baseUrl+'/remove/',function(req,res){
        self.model.remove(req.body,function(){
            res.redirect('/article/list/');
        });
    });
    // get add
    this.express.get(baseUrl+'/add/',function(req,res){
        object = { pagename: 'Article add', userName: 'DiegoUG', csrfToken: req.csrfToken()};
        self.view.add(res,object);
    });
    // get see
    this.express.get(baseUrl+'/see/:data',function(req,res){
        var self = this;
        object = { pagename: 'Article add', userName: 'DiegoUG',  csrfToken: req.csrfToken()};
        self.model.get({slug:req.params.data},function(doc){
            object.article = doc[0];
            self.view.see(res,object);
        });
    });
    // get edit
    this.express.get(baseUrl+'/edit/:data',function(req,res){
        var self = this;
        object = { pagename: 'Article edit', userName: 'DiegoUG',  csrfToken: req.csrfToken()};
        self.model.get({slug:req.params.data},function(doc){
            object.article = doc[0];
            self.view.add(res,object);
        });
    });
    // get list
    this.express.get(baseUrl+'/list/',function(req,res){
        //this.conf.plugins.nodemailer.sendMail();
        var self = this;
        object = { pagename: 'Article list', userName: 'DiegoUG'};
        self.model.get({},function(docs){
            object.articles = docs;
            self.view.list(res,object);
        });
    });
};
// export module
module.exports = Article;