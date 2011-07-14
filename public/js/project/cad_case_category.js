
CADCaseCategory = Backbone.Model.extend({
});


CADCaseCategories = Backbone.Collection.extend({
		model:CADCaseCategory,
		
		initialize: function () {
			_.bindAll(this, "onGotCaseCategories");
			_.bindAll(this, "fetch");
			
		},
		
		onGotCaseCategories: function (data) {
			console.log(data);
			this.addCouchData(data);
		},
		
		fetch: function () {
			now.getCaseCategories(this.onGotCaseCategories);
		},
		
		
});
