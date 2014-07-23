App.Collections.Subs = Backbone.Collection.extend({
	url: "api/subs",
	
	model: App.Models.Sub
})

App.subs = new App.Collections.Subs;