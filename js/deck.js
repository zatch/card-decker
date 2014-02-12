// -----------------------------------------------------------------------------
// Stage Class
// -----------------------------------------------------------------------------
var Deck = EventEmitter.extend({
	
	$container: null,
	$drawPile: null,
	$flop: null,
	_cards: null,
	_drawPile: null,
	_flopped: null,
	
	init: function ($container, cards) {
		this._super();
		
		this._drawPile = this._cards = cards;
		this._flopped = [];
		
		this.$drawPile = $("<div class='draw-pile'></div>").click($.proxy(function() {
			this.draw();
		}, this));
		
		this.$flop = $("<ul class='flop'></ul>");
		
		this.$container = $container
			.empty()
			.append(this.$drawPile)
			.append(this.$flop);
	},
	
	/**
	 * Shuffle deck.
	 * 
	 * Adapted from:
	 * + Jonas Raoni Soares Silva
	 * @ http://jsfromhell.com/array/shuffle [v1.0]
	 */
	shuffle: function() {
		var o = this._drawPile;
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
		return this;
	},
	
	/**
	 * Draw top card of the deck.
	 */
	draw: function() {
		this._flopped.push(this._drawPile.pop());
		this.print();
	},
	
	/**
	 * Draw deck.
	 */
	print: function() {
		
		this.$drawPile.text(this._drawPile.length);
		this.$flop.empty();
		for (var lcv = 0; lcv < this._flopped.length; lcv++) {
			var c = this._flopped[lcv];
			this.$flop.append("<li>" + c.name + "</li>");
		}
		
		/*this.$container.html("<ul></li>");
		
		for (var lcv = 0; lcv < this._cards.length; lcv++) {
			var c = this._cards[lcv];
			this.$container.append("<li>" + c.name + "</li>");
		}*/
		return this;
	}
});