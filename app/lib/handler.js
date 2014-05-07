
var Neon = require('neon');

var Handler = Neon.Class()({
	prototype : {
		init: function(url){
			debugger;
			if (url == '/'){
				this.url = '/home/see/1'
			} else {
				if (url.indexOf("save") || url.indexOf("edit") || url.indexOf("remove")){
					this.url = '/article' + url;
				} else {
					this.url = '/article/see' + url;
				}
			}

			request = this.url.split('/');
			request.splice(0,1)
			this.exit = request;
		}
	}
});

module.exports = Handler;