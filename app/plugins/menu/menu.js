// dependencies
var mongoose = require('mongoose');
// shema
var menu = new Schema({
    menuName : { type: String, required: true},
    item     : [{
                   itemName : { type: String, required: true},
                   type     : { type: String, required: true},
                   page     : { type: Schema.ObjectId, ref:'Article' },
                   url      : { type: String, required: true},
                   category : { type: String, required: true},
                }],
    location : { type: String, required: true},
    created  : { type: Date, 'default': Date.now },
});
// module
var Menu = mongoose.model('Menu', menu);
// export module
module.exports = Menu;