
CADCaseCategory = Backbone.Model.extend({
});


CADCaseCategories = Backbone.Collection.extend({
		model:CADCaseCategory,
		
		onGotCaseCategories: function (data) {
		console.log(data);
		console.log(this);
		},
		
		
		fetch: function () {
			now.getCaseCategories(this.onGotCaseCategories);
		},
		
		initialize: function () {
		},
		
		
		
});
