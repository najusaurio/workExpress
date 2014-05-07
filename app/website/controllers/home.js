var Home = function(resource, req, next){
	//self.model   = new Home();
	//self.view    = new HomeView();
	this.exit    = this[resource](req, next);
}

Home.prototype.post_save = function(req, next){
	res.send('Hello from Worker');
}

Home.prototype.post_remove = function(req, next){
	res.send('Hello from Worker');
}

Home.prototype.get_add = function(req, next){
	res.send('Hello from Worker add');
}

Home.prototype.get_see = function(req, next){
	res.send('Hello from Worker see');
}

Home.prototype.get_edit = function(req, next){
	return 'Hello from Worker edit in Home ';
}

Home.prototype.get_list = function(req, next){
	res.send('Hello from Worker list');
}

module.exports = Home;