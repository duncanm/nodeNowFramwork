
CADCaseCategory = Backbone.Model.extend({
});


CADCaseCategories = Backbone.Collection.extend({
		model:CADCaseCategory,
		initialize: function () {
			this.url = 'casecategories/index';
		},
		
});
