// http://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false
CommonPlaceName = Backbone.Model.extend({
	
	validate: function() {
	},
	
	
	initialize: function (){
		this.set({id: 0});
		this.set({suburb: "initial"});
		this.set({StreetName: "initial"});
		this.set({cpn: "initial"});
		this.set({StreetNumber: "initial"});
	
	
	},
	
	
	addressHTTPParameterForm : function () {
		var address;
		address = this.get("cpn") + ", " + this.get("StreetNumber") + " " + this.get("StreetName") + this.get("suburb") + ",South Australia";
		address = address.replace('"', " ");
		address = address.replace(' ', ",");
		address = '"' + address + '"';
		return address;
		
	},
	
	
	geocodeWithGoogle: function () {
		console.log(this.addressHTTPParameterForm());
	},
	
	url: function () {
		return "commonplacenames/index/id/" + this.get("id");
	}
}
);



CommonPlaceNames = Backbone.Collection.extend({model: CommonPlaceName,
									initialize: function () {
										this.url = 'commonplacenames/limit/100';
											},
										});
									

GeocoderView = Backbone.View.extend({
	tagName: 'div',
	
	
	

	initialize: function () {
		var thisproxy = this;
		_.bindAll(this, "render");
		var timer;
		timer = $.after("15","sec",function() {thisproxy.updateGeo()});
		console.log(timer);
	},

	
	updateGeo: function () {
		console.log('flicked');
		var newtime = new Date();
		this.model.set({time: newtime});
	},

	
	render: function () {
		console.log('upd');
		$(this.el).html(_.template($("#geocoder_template").html(),this.model.toJSON()));
		return this;
	},
	
	
	canClose: function () {
		return true; //to do.. apply business rules to derive this decision
   },

	closeGecoder: function (event) {
		this.controller.closeView(this);
			},

	googleIt: function (event) {
		this.model.geocodeWithGoogle();
	},

	events: {
		'click #btnGeocoderClose' : 'closeGecoder',
		'click #btnGeocodeGoogleIt': 'googleIt'
	},

});


CAD.geocoderController = {

	initialize: function () {
	},

	closeView: function (view) {
		var index = _.indexOf(this.geocoderViews, view);
		if (view.canClose()) {
			CAD.destroyCurrentViewTab();
			this.geocoderViews.remove(index, index);
		}
	},
	
	onAddGeocoder: function () {
		var newGeocoderView;
		newGeocoderView = new GeocoderView();
		newGeocoderView.controller = this;
		newGeocoderView.model = new CommonPlaceName();
		newGeocoderView.model.bind('change', newGeocoderView.render);
		this.geocoderViews.push(newGeocoderView);
		newGeocoderView.tab = CAD.addViewTab("Geocoder");
		newGeocoderView.model.fetch();
	    $(newGeocoderView.tab).append(newGeocoderView.render().el);
	},
							
								
	geocoderViews : []
};


$(document).ready(function () {
	CAD.geocoderController.initialize();
	CAD.registerController(CAD.geocoderController);
});	

