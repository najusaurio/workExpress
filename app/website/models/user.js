// dependencies
var modelUser = require('./schema/user'),
    bcrypt    = require('bcrypt');

function hash (password, callback){
    if(password!=''){
        var getSalt, getPassword;
        bcrypt.genSalt(12, function (err, salt) {
            if (err) return next(err);
            getSalt = salt;
            bcrypt.hash(password, salt, function (err, hash){
                if (err) return next(err);
                getPassword = hash;
                callback({salt:getSalt,password:getPassword});
            })
        });
    } else {
        callback(false);
    }
}

// module
var User = function(config){
    config     = config || {};
    this.model = modelUser;
};
// save data
User.prototype.save = function(data,callback){
    var self = this;
    hash(data.password,function(setPassword){
        if(setPassword){
            data.password = setPassword.password;
            data.salt = setPassword.salt;
        }
        if(data._id == ''){
            delete data._id;
        }
        var query = data._id == undefined ? data : {_id: data._id};
        self.model.findOneAndUpdate(query,data,{upsert: true},function(err,doc) {
            callback(doc);
        });
    });

};
// get data by id
User.prototype.getById = function(query,callback){
    this.model.findById(query,function(err,docs){
        callback((docs === undefined) ? false : docs);
    });
};
// remove data
User.prototype.remove = function(data,callback){
    this.model.remove({_id:data._id}).exec(function(err){
        callback();
    });
};
// get data
User.prototype.get = function(query,callback){
    this.model.find(query, function(err,docs){
        callback(docs);
    });
};
// export module
module.exports = User;