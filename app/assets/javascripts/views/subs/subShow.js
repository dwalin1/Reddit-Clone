App.Views.subShow = Backbone.View.extend({
	template: JST["subs/subShow"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);	
	},
	
	render: function() {
		var renderedContent = this.template({
			sub: this.model
		});
		this.$el.html(renderedContent);
		return this;
	}	
});