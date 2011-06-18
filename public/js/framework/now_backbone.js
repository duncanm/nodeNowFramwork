function addCouchData(data) {
	for (var i=0; i < data.length; i++) {
				this.add([data[i].value]);
				this.models[i].set({"id": this.models[i].get("_id")});
			}
};

Backbone.Collection.prototype.addCouchData = addCouchData;

