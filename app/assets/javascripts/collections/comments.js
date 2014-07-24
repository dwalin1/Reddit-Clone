// not sure if I want or need this collection

App.Collections.Comments = Backbone.Collection.extend({
	model: App.Models.Comment,
	
	url: "api/comments"
});