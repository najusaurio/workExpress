var Home = function(config){
	config = config || {};
}

Home.prototype.see = function(res, object){
	res.render('index', object);
}

module.exports = Home;