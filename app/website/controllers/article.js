
var Article = function(resource, req, res, next){
    this.response = this[resource](req, res, next);
};

Article.prototype.post_save = function(req, res, next){
    res.send('Hello from Worker');
};

Article.prototype.post_remove = function(req, res, next){
    res.send('Hello from Worker');
};

Article.prototype.get_add = function(req, res, next){
    res.send('Hello from Worker add');
};

Article.prototype.get_see = function(req, res, next){
    res.send('Hello from Worker article see');
};

Article.prototype.get_edit = function(req, res, next){
    res.send('Hello from Worker edit');
};

Article.prototype.get_list = function(req, res, next){
    res.send('Hello from Worker list');
};

module.exports = Article;