// module
var Article = function(conf){
    this.conf = conf || {};
};
// render see
Article.prototype.see = function(res,object){
    res.render('article_see',object);
};
// render list
Article.prototype.list = function(res, object){
    res.render('article_list', object);
};
// export module
module.exports = Article;