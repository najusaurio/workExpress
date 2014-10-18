// dependencies
//var modelHome = require('../../plugins/menu/model/menu');
// module
var Home = function(config){
    config = config || {};
    //this.model = modelHome;
};
// save data
Home.prototype.save = function(query,data,callback){
    this.model.findOneAndUpdate(query,data,{upsert:true}).exec(function(err,res){
        callback(res);
    });
};
// get data
Home.prototype.get = function(callback){
    this.model.find({name:'Home'}).exec(function(err,res){
        callback(res);
    });
};
// export module
module.exports = Home;