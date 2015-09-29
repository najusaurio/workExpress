// dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
// shema
var user = new Schema({
    username  : { type: String, required: true},
    password  : { type: String, required: true},
    salt      : { type: String, required: true},
    firstName : String,
    lastName  : String,
    eMail     : String,
    state     : { type: Boolean, default: false },
    staff     : { type: Boolean, default: false },
    created   : { type: Date, 'default': Date.now },
    lastLogin : Date
});
// module
var User = mongoose.model('User', user);
// export module
module.exports = User;

