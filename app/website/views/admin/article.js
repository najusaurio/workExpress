var http = require('http'),
    exec = require('child_process').exec,
    request = require('request');
// module
var Article = function(conf){
    this.conf = conf || {};
};
// render add edit
Article.prototype.AddEdit = function(res, object){
    var body = {'component':'/app/static/public/js/components/AdminArticleAdd.js','props':object};
    request.post({url:'http://localhost:3333', 'body':JSON.stringify(body)},function(error, response, body){
        if (error) console.log(error);
        res.render('admin_article_add', {'HTMLRenderReact':body});
    })
};
// render list
Article.prototype.list = function(res, object){
    res.render('admin_article_list', object);
};
// export module
module.exports = Article;