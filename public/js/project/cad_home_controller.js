CADHomeView = Backbone.View.extend({
	tagName: 'div',
	
	render: function () {
		$(this.el).html($("#home_template").html());
		return this;
	},
	
	events: {
	},

});

CAD.homeController = {
	initialize: function () {
		_.bindAll(this);
	},
	
	onAddCADHome: function () {
		var newHomeView;
		newHomeView = new CADHomeView();
		newHomeView.controller = this;
		this.homeViews.push(newHomeView);
		newHomeView.tab = CAD.addViewTab("Home");
		$(newHomeView.tab).append(newHomeView.render().el);
	},
							

	homeViews: [],
	

};


$(document).ready(function () {
	CAD.homeController.initialize();
	CAD.registerController(CAD.homeController);
	CAD.homeController.onAddCADHome(); //we always want a home controller;
});	

