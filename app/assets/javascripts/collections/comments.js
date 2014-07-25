App.Collections.Comments = Backbone.Collection.extend({
	model: App.Models.Comment,
	
	url: function() {
		if (this.parent_comment) {
			return "/api/nested_comments/" + this.parent_comment.id;
		} else if (this.post) {
			return "/api/posts/" + this.post.id + "/comments";
		} else {
			throw "Comments collection must be initialized with a post or parent_id";
		}
	},
	
	initialize: function(models, options) {
		this.post = options.post;
		this.parent_comment = options.parent_comment;
	}
});