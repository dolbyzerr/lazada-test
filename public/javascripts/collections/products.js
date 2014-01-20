var app = app || {};

(function(){
	'use strict';

	app.Products = Backbone.Collection.extend({
		model: app.Product,
		url: '/products',

		getCompared: function(){
			var products = this.toJSON();
			var result = {};
			function getValues(name){ return _.map(products, function(item){ return item[name] }) }

			if(products[0].specs && products[1].specs){
				_.extend(result, {
					specs: _.intersection(
						_.keys(products[0].specs),
						_.keys(products[1].specs)
					).map(function(key){
						return {
							name: key,
							values: [products[0].specs[key], products[1].specs[key]]
						}
					})
				});
			}
			_.each(products[0], function(product, key){
				if(key !== 'specs') result[key] = getValues(key);
			})

			return result;
		}

	});

})();
