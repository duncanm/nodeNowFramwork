AVLMappingView = Backbone.View.extend({
	tagName: 'div',
	
	render: function () {
		$(this.el).html($("#avl_mapping_template").html());
		return this;
	},
	
	
	canClose: function () {
		return true; //to do.. apply business rules to derive this decision
   },

	closeMap: function (event) {
		this.controller.closeView(this);
			},

	events: {
		'click #btnMapClose' : 'closeMap'
	},

});



CAD.AVLmappingController = {

	initialize: function () {
		_.bindAll(this);
	},

	closeView: function (view) {
		var index = _.indexOf(this.mappingViews, view);
		if (view.canClose()) {
			CAD.destroyCurrentViewTab();
			this.mappingViews.remove(index, index);
		}
	},
	
	onAddAVLMap: function () {
		var newMappingView;
		newMappingView = new AVLMappingView();
		newMappingView.controller = this;
		this.mappingViews.push(newMappingView);
		newMappingView.tab = CAD.addViewTab("AVL");
		$(newMappingView.tab).append(newMappingView.render().el);
		
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		var myOptions = {
				zoom: 8,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP};
	    var map = new google.maps.Map(document.getElementById(newMappingView.tab.substring(1, newMappingView.tab.length)), myOptions);
		
	},
							
								
	mappingViews : []
};


$(document).ready(function () {
	CAD.AVLmappingController.initialize();
	CAD.registerController(CAD.AVLmappingController);
});	

