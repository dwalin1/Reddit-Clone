App.Collections.Posts = Backbone.Collection.extend({
	initialize: function(models, options) {
		if (options) {
			this.sub = options.sub;
		}
	},
	
	url: function() {
		if (this.sub) {
			return "api/subs/" + this.sub.id;
		} else {
			return "api/posts";
		}
	},
	
	model: App.Models.Post,
	
	parse: function(response) {
		this.page = parseInt(response.page);
		this.total_pages = parseInt(response.total_pages);
		delete response.page
		delete response.total_pages
		return response.posts;
	}
});

App.posts = new App.Collections.Posts();