// dependencies
var mongoose = require('mongoose');
// shema
var user = new Schema({
    username  : { type: String, required: true},
    password  : String,
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