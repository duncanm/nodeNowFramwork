
CADCategory = Backbone.Model.extend({
});


CADCategories = Backbone.Collection.extend({
		model:CADCategory,
  	
		fetchurl: function (theurl) {
			this.url = theurl;
			this.fetch({
					error: function () {console.log(arguments)},
					success: function (collection, response) {
										console.log('success collcetion');
										collection.each(function(category) {console.log(category.get('name'))});
										}, 
					
					error: function (collection, response) {
										console.log(response); //to do, handle
										}
							}); 
	}


});
