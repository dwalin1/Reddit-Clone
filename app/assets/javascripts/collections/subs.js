App.Collections.Subs = Backbone.Collection.extend({
	url: "api/subs",
	
	model: App.Models.Sub,
	
	getOrFetch: function (id) {
	  var collection = this;
	  var model  = this.get(id);
	  
	  if (model) {
	    model.fetch();
	  } else {
	    model = new App.Models.Sub({ id: id });
	    model.fetch({
	      success: function () { collection.add(model); }
	    });
	  }

	  return model;
	}
})

App.subs = new App.Collections.Subs();