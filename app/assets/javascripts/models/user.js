App.Models.User = Backbone.Model.extend({
	urlRoot: "api/users",
	
	posts: function() {
		this._posts = this._posts ||
		new App.Collections.Posts([], {});
		return this._posts;
	},
	
	subs: function() {
		this._subs = this._subs ||
		new App.Collections.Subs([], {});
		return this._subs;
	},

	parse: function(response) {
		if (response.posts) {
			this.posts().set(response.posts, {});
			delete response.posts;
		}
		
		if (response.subs) {
			this.subs().set(response.subs, {});
			delete response.subs;
		}
				
		return response
	}
});