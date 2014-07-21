// module
var Article = function(conf){
    this.conf     = conf || {};
    this.response = function(){
        this[this.conf.resource](this.conf.req,this.conf.res,this.conf.next);
    };
};
// post save
Article.prototype.post_save = function(req, res, next){
    res.send('Hello from Worker');
};
// post remove
Article.prototype.post_remove = function(req, res, next){
    res.send('Hello from Worker');
};
// get add
Article.prototype.get_add = function(req, res, next){
    res.send('Hello from Worker add');
};
// get see
Article.prototype.get_see_data = function(req, res, next){
    res.send('Hello from Worker article see');
};
// get edit
Article.prototype.get_edit_data = function(req, res, next){
    res.send('Hello from Worker edit');
};
// get list
Article.prototype.get_list = function(req, res, next){
    res.send('Hello from Worker list');
};
// export module
module.exports = Article;