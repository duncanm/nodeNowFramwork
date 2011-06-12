var Cases = function (everyone) {

	everyone.now.consoleTest3 = function (callback) {
		console.log("test3!");
	};

	everyone.now.createCase = function (callback, thecase) {
		console.log("save case");
		console.log(callback);
		callback("furkle");
	};
	
	everyone.now.retrieveCase = function (callback, thecase) {
		console.log("save case");
	};
	
	everyone.now.updateCase = function (callback, thecase) {
		console.log("save case");
	};
	
	everyone.now.deleteCase = function (callback, thecase) {
		console.log("save case");
	};
	
	everyone.now.getCases = function (callback) {
		console.log("save case");
	};
	
	
	
	

	
	};

exports.cases = function(everyone) {
       return new Cases(everyone);
};
