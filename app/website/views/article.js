// module
var Article = function(conf){
    this.conf = conf || {};
};
// render edit
Article.prototype.add = function(res, object){
    res.render('article_add', object);
};
// render see
Article.prototype.see = function(res,object){
    res.render('article_see',object);
};
// render edit
Article.prototype.edit = function(res, object){
    res.render('article_edit', object);
};
// render edit
Article.prototype.list = function(res, object){
    res.render('article_list', object);
};
// export module
module.exports = Article;