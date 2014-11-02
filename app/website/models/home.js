// dependencies
var modelHome = require('./schema/menu');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
// module
var Home = function(config){
    config = config || {};
    this.model = modelHome;
};
// save data
Home.prototype.save = function(query,data,callback){
    this.model.findOneAndUpdate(query,data,{upsert:true}).exec(function(err,res){
        callback(res);
    });
};
// get data
Home.prototype.get = function(callback){
    this.model.find({name:'Home'}).populate('item.page').exec(function(err,res){
        callback(res);
    });
};
// export module
module.exports = Home;