CADInformation = Backbone.Model.extend({

	initialize: function (){
		this.set({time: 0});
	},


	url: function () {
		return "information";
	}
}
);

CADInformationView = Backbone.View.extend({
	tagName: 'div',


	initialize: function () {
		_.bindAll(this, "render");
		var thisproxy = this;
		$.every("5","sec",function() {thisproxy.update()});
	},

	update: function () {
		var newtime = new Date();
		this.model.set({time: newtime});
	},

	render: function () {
		$(this.el).html(_.template($("#information_template").html(),this.model.toJSON()));
		return this;
	},

	
});

CAD.informationController = {
	initialize: function () {
		this.informationView = new CADInformationView();
		this.informationView.model = new CADInformation();
		this.informationView.model.bind('change', this.informationView.render);
		this.informationView.controller = this;
		$("#divInformation").append(this.informationView.render().el);
	},

};


$(document).ready(function () {
	CAD.informationController.initialize();
	CAD.registerController(CAD.informationController);

});	

