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

	// parse: function(response) {
	// 	if (response.comments) {
	// 		this.comments().set(response.comments, { parse: true });
	// 		delete response.comments;
	// 	}
	//
	// 	return response
	// },
	
	initialize: function(options) {
		if (options.post) {
			// throw "Post must given to comment model on initialize";
			this.post = options.post;
		}		
	}
});