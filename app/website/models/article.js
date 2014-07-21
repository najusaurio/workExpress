// dependencies
var mongoose = require('mongoose');
// shema
var articleSchema = new mongoose.Schema({
    title       : { type: String, required: true},
    slug        : { type: String, required: true},
    tags        : String,
    description : String,
    content     : String,
    imageURL    : String,
    state       : { type: Boolean, default: false },
    published   : Date,
    created     : { type: Date, 'default': Date.now },
    author      : { type: Schema.ObjectId, ref:'User' },
    hits        : Number
    // record: something like git
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