App.Views.basePostShow = Backbone.View.extend({
	template: JST["posts/basePostShow"],
	
	className: "row post", 
	
	initialize: function(options) {
		this.index = options.index;
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, "change", this.render);
	},
	
	events: {
		"click span.upvote": "voteClick",
		"click span.downvote": "voteClick"
	},
	
	render: function() {
		var activeVote = (user_id) ? this.vote().get("vote_type") : false;
		
		var renderedContent = this.template({
			post: this.model,
			index: this.index,
			activeVote: activeVote,
			hasImg: this.hasImg()
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	hasImg: function() {
		var url = this.model.get("url");
		if (url.slice(url.length-4) === ".jpg") {
			if (url.slice(9, 14) === "imgur") {
				var smallUrl = url.slice(0, url.length-4);
				smallUrl = smallUrl + "s.jpg";
				return smallUrl;
			}
			return url;
		} else {
			return false;
		}
	}
});