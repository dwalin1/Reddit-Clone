App.Collections.Posts = Backbone.Collection.extend({
	url: "api/posts",
	
	model: App.Models.Post,
	
	getOrFetch: function (id) {
	  var collection = this;
	  var model  = this.get(id);
	  
	  if (model) {
	    model.fetch();
	  } else {
	    model = new App.Models.Post({ id: id });
	    model.fetch({
	      success: function () { collection.add(model); }
	    });
	  }

	  return model;
	}
})