
var Cad = function (server, everyone, database) {

	this.cases = require("./cad-system-cases.js").cases(everyone, database);
	

};

exports.cad = function(server, everyone, database) {
	var newcad = new Cad(server, everyone, database);
	newcad.server = server;



    return newcad;
};
