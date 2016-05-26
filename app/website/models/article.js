// dependencies
var modelArticle = require('./schema/article');
// module
var Article = function(config){
    config     = config || {};
    this.model = modelArticle;
};
// save data
Article.prototype.save = function(data,callback){
    this.model.findOneAndUpdate({
        _id:data.id,
        author: data.author
    },data,{upsert:true}).exec(function(err,doc){
        callback(doc);
    });
};
// save data
Article.prototype.remove = function(data,callback){
    this.model.remove({_id:data._id}).exec(function(err){
        callback();
    });
};
// get data
Article.prototype.get = function(query,callback){
    this.model.find(query).populate('author').sort('-date').exec(function(err,docs){
        callback(docs);
    });
};
// export module
module.exports = Article;