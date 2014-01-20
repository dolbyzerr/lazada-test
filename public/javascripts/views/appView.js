var app = app || {};

(function($){
	'use strict';

	app.AppView = Backbone.View.extend({
		el: 'body',

		events: {
			'submit #request': 'loadProducts'
		},

		initialize: function(){
			this.listenTo(app.products, 'request', this.startLoading);
			this.listenTo(app.products, 'sync', this.stopLoading);
			this.listenTo(app.products, 'sync', this.renderProducts);
			this.productsView = new app.ProductsView({collection: app.products});
			this.spinner = new Spinner().spin($("#loader")[0]);
			this.$link1 = $(".request__input1");
			this.$link2 = $(".request__input2");
			this.$error = $(".request__error");
		},

		startLoading: function(){
			this.$el.toggleClass('loading', true);
			this.$el.removeClass('start');
		},

		stopLoading: function(){
			this.$el.toggleClass('loading', false);
		},

		renderProducts: function(){
			$('#result').empty().append(this.productsView.render().el);
		},

		validate: function(){
			var legalUrl = /https?:\/\/www.lazada.com.my\/.*\.html/;
			var valid = [legalUrl.test(this.$link1.val()), legalUrl.test(this.$link2.val())]
			console.log(valid[0], valid[1])
			this.$link1.toggleClass('error', !valid[0]);
			this.$link2.toggleClass('error', !valid[1]);
			this.showError('Please enter valid url', !(valid[0] && valid[1]));
			return valid[0] && valid[1];
		},

		showError: function(msg, hide){
			this.$error.toggleClass('show', !!hide);
			this.$error.text(msg);
		},

		loadProducts: function(evt){
			evt.preventDefault();
			if(!this.validate()) return false;
			app.products.fetch({data: {
				url1: this.$link1.val(),
				url2: this.$link2.val()
			}} );
		}

	});

})(jQuery);