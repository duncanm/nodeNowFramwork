/*global document console alert Backbone CAD _ $ */

var Case, Cases, CaseView, CaseCategories, CaseCategory;

Case = Backbone.Model.extend({
	
	validate: function() {
	},
	
	
	initialize: function (){
		this.set({address1: ""});
		this.set({address2: ""});
		this.set({dob: "01-08-1969"});
		this.set({type:"case"});
		this.set({createdby: CAD.username});
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
	
	initialize: function () {
			_.bindAll(this, "onCaseCreated");
	},
	
	
	canClose: function () {
		return true; //to do.. apply business rules to derive this decision
   },
	
	className: 'case',

	render: function () {
		$(this.el).html(
			_.template($("#case_template").html(),
				this.model.toJSON())
		);
		CAD.fillSelectWithCollection(this.$('#case_category'), CAD.caseController.caseCategories, "title");
		this.$('#case_dob').datepicker({
			showOn: "button",
			dateFormat: 'yy-mm-dd', 
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

	onCaseCreated: function (newid) {
			this.model.set({id: newid});
			console.log("ID:"  + this.model.get("id") );

	},

	onFailSaved: function (message) {
			console.log(message);
	},
	
	onCaseUpdated : function (message) {
			console.log(message);
	},


	saveCase: function (event) {
		if (this.validateForm()){
				this.model.save({},{error: function () {alert('error');}, success: function () {} });
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
		CAD.whenNowIsReadyDo(this.caseCategories.fetch);
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
	},
							
						
	onTest: function () {
	},						
		
							
	caseViews : []
};


$(document).ready(function () {
	CAD.caseController.initialize();
	CAD.registerController(CAD.caseController);
});	
