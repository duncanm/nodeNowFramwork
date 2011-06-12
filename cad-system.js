
var Cad = function (server, everyone) {

	this.cases = require("./cad-system-cases.js").cases(everyone);
	everyone.now.consoleTest2 = function () {
			console.log("test2!");
		};
	

};

exports.cad = function(server, everyone) {
	var newcad = new Cad(server, everyone);
	newcad.server = server;



    return newcad;
};
