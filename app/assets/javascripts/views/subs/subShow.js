App.Views.subShow = Backbone.CompositeView.extend({
	template: JST["subs/subShow"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);		
	},
	
	events: {
		"click button.deleteSub": "deleteSub"
	},
	
	render: function() {
		var renderedContent = this.template({
			sub: this.model,
		});
		this.$el.html(renderedContent);
		
		var view = this;
		var $newPostEl = $("div.postPost");
		
		var newPostView = new App.Views.postForm({
			model: new App.Models.Post({
				sub_id: this.model.get("id")	
			})
		});
		
		view.addSubview($newPostEl, newPostView);
		
		// this.model.comments().each(function(comment) {
		// 	var commentShow = new App.Views.commentShow({
		// 		model: comment
		// 	});
		// 	view.addSubview($commentEl, commentShow);
		// });
		
		return this;
	},
	
	deleteSub: function() {
		this.model.destroy();
		App.router.navigate("#", { trigger: true });
	}
});