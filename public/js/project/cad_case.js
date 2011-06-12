/*global document console alert Backbone CAD _ $ */

var Case, Cases, CaseView, CaseCategories, CaseCategory;

Case = Backbone.Model.extend({
	
	validate: function() {
	},
	
	
	initialize: function (){
		this.set({address1: ""});
		this.set({address2: ""});
		this.set({category: 0});
		this.set({dob: "01-Aug-1969"});
		this.set({id: 0});
	},
	
	
	
	url: function () {
		return "cases/save/id/" + this.get("id");
	}
}
);

Cases = Backbone.Collection.extend({model: Case,
									initialize: function () {
										this.url = 'cases/active';
											},
	
									});

CaseView = Backbone.View.extend({
	tagName: 'div',
	
	canClose: function () {
		return true; //to do.. apply business rules to derive this decision
   },
	
	className: 'case',

	render: function () {
		$(this.el).html(
			_.template($("#case_template").html(),
				this.model.toJSON())
		);
		CAD.fillSelectWithCollection(this.$('#case_category'), CAD.caseController.caseCategories, "categorycode");
		this.$('#case_dob').datepicker({
			showOn: "button",
			buttonImage: "images/calendar.gif",
			buttonImageOnly: true
		});
		
	
		return this;
	},


	events: {
		'change .case_edit': 'caseChange',
		'click #btnCaseSave': 'saveCase',
		'click #btnCaseClose' : 'closeCase'
	},

	validateForm: function () {
		return this.$('.caseform').validate().form();
	},	

	onCaseSaved: function (message) {
			console.log(message);
	},

	saveCase: function (event) {
		if (this.validateForm()){
			now.createCase(this.onCaseSaved, this.model);
			};
	},

	closeCase: function (event) {
		this.controller.closeView(this);
	},
	

	caseChange: function () {
		this.model.set({address1: this.$('#case_address1').val()});
		this.model.set({address2: this.$('#case_address2').val()});
		this.model.set({categoryid: this.$('#case_category').val()});
		this.model.set({dob: this.$('#case_dob').val()});
	}
});


CAD.caseController = {

	initialize: function () {
		_.bindAll(this);
		this.caseCategories = new CADCaseCategories();
		this.caseCategories.fetch();
		this.activeCases = new Cases();
	},

	closeView: function (view) {
		var index = _.indexOf(this.caseViews, view);
		if (view.canClose()) {
			CAD.destroyCurrentViewTab();
			this.caseViews.remove(index, index);
		}
	},
	
	onAddCase: function () {
		var newCaseView;
		newCaseView = new CaseView();
		newCaseView.model = new Case({address1: "test"});
		newCaseView.controller = this;
		this.caseViews.push(newCaseView);
		newCaseView.tab = CAD.addViewTab("Case");
		$(newCaseView.tab).append(newCaseView.render().el);
		console.log(newCaseView.model);
		now.consoleTest();
	},
							
						
	onTest: function () {
	},						
		
							
	caseViews : []
};


$(document).ready(function () {
	CAD.caseController.initialize();
	CAD.registerController(CAD.caseController);
});	