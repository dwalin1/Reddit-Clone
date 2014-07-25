App.Models.Post = Backbone.Model.extend({
	urlRoot: "api/posts",
	
	comments: function() {
		this._comments = this._comments ||
		new App.Collections.Comments([], { post: this });
		return this._comments;
	},
	
	top_level_comments: function() {
		this._top_level_comments = this._top_level_comments ||
		new App.Collections.Comments([], { post: this });
		return this._top_level_comments;
	},

	parse: function(response) {
		var post = this;
		
		if (response.comments) {
			_.each(response.comments, function(comment) {
				comment["post"] = post;
			});
			this.comments().set(response.comments, { parse: true });
			delete response.comments;
		}
		
		if (response.top_level_comments) {
			_.each(response.top_level_comments, function(comment) {
				comment["post"] = post;
			});
			this.top_level_comments().set(response.top_level_comments, { parse: true });
			delete response.top_level_comments;
		}
		
		return response
	}
});