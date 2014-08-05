App.Models.Comment = Backbone.Model.extend({
	urlRoot: "api/comments",
	
	comments: function() {
		this._comments = this._comments ||
		new App.Collections.Comments(this.get("post").comments().where({
			parent_comment_id: this.id
		}), 
			{ parent_comment: this });
		return this._comments;
	},

	initialize: function(options) {
		if (options.post) {
			this.post = options.post;
		}		
	}
});