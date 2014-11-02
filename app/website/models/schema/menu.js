// dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    Article  = require('./article');
// shema
var menu = new Schema({
    active   : { type: Boolean, default: false },
    name     : { type: String, required: true},
    item     : [{ itemName : { type: String, required: true},
                  type     : { type: String, required: true},
                  page     : { type: Schema.ObjectId, ref:'Article' },
                  url      : { type: String },
                  category : { type: String } }],
    location : { type: String, required: true},
    created  : { type: Date, default: Date.now }
});
// module
var Menu = mongoose.model('Menu', menu);
// export module
module.exports = Menu;