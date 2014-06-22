
var Home = function(config){
	config = config || {};
};

Home.prototype.get = function(callback){
	var pass = true;
	callback(pass);
};

module.exports = Home;