
var Cad = function (server, everyone, thedatabase) {

	this.cases = require("./cad-system-cases.js").cases(everyone, thedatabase);
	

};

exports.cad = function(server, everyone, thedatabase) {
	var newcad = new Cad(server, everyone, thedatabase);
	newcad.server = server;
    return newcad;
};
