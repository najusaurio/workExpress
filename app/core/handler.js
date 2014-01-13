
var Neon = require('neon');

var Handler = Neon.Class()({
	prototype : {
		init: function(url){
			if (url == '/' || url == '/website'){url = '/website/home/see/0'}
			request = url.split('/');
			request.splice(0,1)
			this.exit = request;
		}
	}
});

module.exports = Handler;