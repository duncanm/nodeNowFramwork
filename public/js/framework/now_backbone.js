function addCouchData(data) {
	for (var i=0; i < data.length; i++) {
				this.add([data[i].value]);
				this.models[i].set({"id": this.models[i].get("_id")});
			}
};

Backbone.Collection.prototype.addCouchData = addCouchData;


Backbone.sync = function(method, model, options) {
	console.log(options);
	options();
	if ( method === "create" ) {
		console.log('saved');
		now.saveModel(typeof model, model);
	}
	
	
	model.id =1;
};

