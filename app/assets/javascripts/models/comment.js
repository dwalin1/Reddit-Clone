App.Models.Comment = Backbone.Model.extend({
	urlRoot: "api/comments",
	
	comments: function() {
		this._comments = this._comments ||
		new App.Collections.Comments([], { post: this });
		return this._comments;
	},

	parse: function(response) {
		if (response.comments) {
			this.comments().set(response.comments, { parse: true });
			delete response.comments;
		}
		
		return response
	}
});