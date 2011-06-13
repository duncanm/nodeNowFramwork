var check = require('validator').check,
	sanitize = require('validator').sanitize,
	crud = require('./crud').crud(),
	tablename = "cases",
	database;



var Cases = function (everyone, thedatabase) {

	database = thedatabase;
	

	everyone.now.createCase = function (callback, failcallback, thecase) {
	    var createsqll
	    console.log(thecase);
		try {		
			check(thecase.address1, 'Please enter address 1').notEmpty();
			console.log('success call back');
			console.log(callback);
			crud.create(database, tablename, thecase, callback);
			} 
		catch(error) {
			failcallback('failed:' + error);
			}	
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

exports.cases = function(everyone, database) {
       return new Cases(everyone, database);
};
