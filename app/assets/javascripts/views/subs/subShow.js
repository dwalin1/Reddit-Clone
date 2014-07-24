App.Views.subShow = Backbone.View.extend({
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
		return this;
	},
	
	deleteSub: function() {
		this.model.destroy();
		App.router.navigate("#", { trigger: true });
	}
});