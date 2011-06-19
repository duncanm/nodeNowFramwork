
var Cad = function (server, everyone, thedatabase) {

	this.cases = require("./cad-system-cases.js").cases(everyone, thedatabase);
	
	this.validateUser = function (username, password) {
		return true;
	};
	
	
	

};

exports.cad = function(server, everyone, thedatabase) {
	var newcad = new Cad(server, everyone, thedatabase);
	newcad.server = server;
    return newcad;
};
