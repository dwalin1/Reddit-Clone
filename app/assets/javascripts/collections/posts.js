App.Collections.Posts = Backbone.Collection.extend({
	url: "api/posts",
	
	model: App.Models.Post,
	
	parse: function(response) {
		this.page = parseInt(response.page);
		this.total_pages = parseInt(response.total_pages);
		return response.posts;
	}
});

App.posts = new App.Collections.Posts();