// module
var Home = function(config){
	config = config || {};
};
// get data
Home.prototype.get = function(callback){
	var pass = true;
	callback(pass);
};
// export module
module.exports = Home;