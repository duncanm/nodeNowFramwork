CasesView = Backbone.View.extend({
	tagName: 'div',

	loadAndRender: function () {
			this.cases.fetch({
				error: function () {console.log(arguments)},
				success: this.onActiveCasesLoaded,

		}) 	
			
	},
	
	onActiveCasesLoaded: function () {
		this.render();
	},


	render: function () {
		$(this.el).html($("#cases_template").html());
		$(this.tab).append(this.el);
	},
	
	initialize: function () {
		_.bindAll(this, "onActiveCasesLoaded");
		this.cases = new Cases();
	},
	
	canClose: function () {
		return true; //to do.. apply business rules to derive this decision
    },

	closeCases: function (event) {
		this.controller.closeView(this);
	},

	events: {
		'click #btnCasesClose' : 'closeCases'
	},

});



CAD.casesController = {

	initialize: function () {
		_.bindAll(this);
	},

	closeView: function (view) {
		var index = _.indexOf(this.casesViews, view);
		if (view.canClose()) {
			CAD.destroyCurrentViewTab();
			this.casesviews.remove(index, index);
		}
	},
	
	onListCases: function () {
		var newCasesView;
		newCasesView = new CasesView();
		newCasesView.controller = this;
		this.casesviews.push(newCasesView);
		newCasesView.tab = CAD.addViewTab("Cases");
		newCasesView.loadAndRender();
	},
							
								
	casesviews : []
};


$(document).ready(function () {
	CAD.casesController.initialize();
	CAD.registerController(CAD.casesController);
});	

