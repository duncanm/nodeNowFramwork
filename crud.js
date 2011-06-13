var Crud = function () {

	this.create = function(database, table, model, callback) {
		var values = [], 
			sql = "insert into " + table + " SET",
			prop;
		for(prop in model) {
			if(model.hasOwnProperty(prop)) {
				sql += " " + prop + "= ?, ";
				console.log(prop +":" + typeof model[prop]);
				values.push(model[prop]);
			}
		 }
		console.log(values);
		sql = sql.slice(0, -2); //slice		 
		console.log(callback);
		database.query(sql, values, function( error, results) {
											  callback(results.insertId);
											  everyone.now.reportInsertion(table, results.insertId);
											});
		};
		
		
};



exports.crud = function() {
       return new Crud();
};
