App.Models.Sub = Backbone.Model.extend({
	urlRoot: "api/subs",
	
	posts: function() {
		this._posts = this._posts ||
		new App.Collections.Posts([], { sub: this });
		return this._posts;
	},

	parse: function(response) {
		if (response.posts) {
			console.log("Setting posts");
			this.posts().set(response.posts, {});
			
			console.log("Response.posts: ");
			console.log(response.posts);
			console.log("Posts()");
			console.log(this.posts());
			delete response.posts;
		}
		
		this.posts().page = this.posts().page || parseInt(response.page);
		this.posts().total_pages = parseInt(response.total_pages);
		delete response.page;
		delete response.total_pages;
				
		return response
	}
});