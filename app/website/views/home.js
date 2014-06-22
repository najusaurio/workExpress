// module
var Home = function(config){
	config = config || {};
};
// render see
Home.prototype.see = function(res, object){
	res.render('index', object);
};
// export module
module.exports = Home;