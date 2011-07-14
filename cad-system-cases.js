var check = require('validator').check,
	sanitize = require('validator').sanitize,
    db,



	validateCase = function (theCase) {
				check(theCase.address1, 'Please enter address 1').notEmpty();
				check(theCase.type).equals("case");
				sanitize(theCase.type);
	};



var Cases = function (everyone, thedatabase) {

	db = thedatabase;

	


	everyone.now.createCase = function (callback, failcallback, theCase) {
			try {
				validateCase(theCase);
				db.save(theCase, function (err, res) {
											if (err) {
												failcallback(err);
												} 
												else 
												{
												theCase.id = res.id;
												callback(theCase.id);
												}
									} 
								
								);
					} catch (e) {
								failcallback(e);
					}
								
								
	};
	
	
	
	everyone.now.getCaseCategories = function (callback) {
		db.view('casecategories/list', function (err, res) {
										console.log(err);
										callback(res);
									});
	};

	everyone.now.retrieveCase = function (callback, thecase) {
		console.log("save case");
	};
	
	everyone.now.updateCase = function (callback, failcallback, theCase) {
		try {
			validateCase(theCase);
		    db.save(theCase.id, theCase, function (err, res) {
											if (err) {
												failcallback(err);
												} 
												else 
												{
												callback("Updated:");
												}
									} 
								
								);
					} catch (e) {
								failcallback(e);
					}
	};

	
	everyone.now.deleteCase = function (callback, thecase) {
		console.log("save case");
	};
	
	everyone.now.getCases = function (callback) {
		console.log("save case");
	};
	
	
	
	

	
	};

exports.cases = function(everyone, thedatabase) {
       return new Cases(everyone, thedatabase);
};
