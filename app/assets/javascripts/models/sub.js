App.Models.Sub = Backbone.Model.extend({
	urlRoot: "api/subs",
	
	posts: function() {
		this._posts = this._posts ||
		new App.Collections.Posts([], { sub: this });
		return this._posts;
	},

	parse: function(response) {
		if (response.posts) {
			this.posts().set(response.posts, { parse: true });
			delete response.posts;
		}
		
		return response
	}
});