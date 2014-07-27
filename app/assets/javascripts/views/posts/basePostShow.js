App.Views.basePostShow = Backbone.View.extend({
	template: JST["posts/basePostShow"],
	
	initialize: function(options) {
		this.index = options.index;
		this.listenTo(this.model, "sync", this.render);	
	},
	
	events: {

	},
	
	render: function() {
		var renderedContent = this.template({
			post: this.model,
			index: this.index
		});
		this.$el.html(renderedContent);
		return this;
	}
});