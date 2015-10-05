// dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
// shema
var articleSchema = new mongoose.Schema({
    status      : { type: Boolean, default: false },
    title       : { type: String, required: true},
    slug        : { type: String, required: true},
    content     : String,
    description : String,
    imageurl    : String,
    tags        : String,
    published   : Date,
    created     : { type: Date, 'default': Date.now, required: true },
    author      : { type: Schema.ObjectId, ref:'User', required: true },
    hits        : Number,
    record      : { type: Schema.ObjectId, ref:'ArticleChange' }
});
// shema validation
articleSchema.path('title').validate(function(val){
    return val.length > 70;
});
// shema validation
articleSchema.path('description').validate(function(val){
    return val.length > 160;
});
// shema validation
articleSchema.path('tags').validate(function(val){
    return val.length > 300;
});
// module
Article = mongoose.model('Article', articleSchema);
// export module
module.exports = Article;