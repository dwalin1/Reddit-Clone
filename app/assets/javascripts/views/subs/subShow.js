App.Views.subShow = Backbone.CompositeView.extend({
	template: JST["subs/subShow"],
	
	initialize: function() {
		
		var newPostView = new App.Views.postForm({
			model: new App.Models.Post({
				sub_id: this.model.get("id")	
			})
		});
		
		this.addSubview("div.postPost", newPostView);
		
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
		
		this.attachSubviews();
		return this;
	},
	
	deleteSub: function() {
		this.model.destroy();
		App.router.navigate("#", { trigger: true });
	}
});