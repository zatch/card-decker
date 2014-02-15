// -----------------------------------------------------------------------------
// Deck Class
// -----------------------------------------------------------------------------
var Deck = EventEmitter.extend({
	
	$deck: null,
	$flop: null,
	_cards: null,
	_flopped: null,
	
	init: function (cards) {
		this._super();
		
		this._flopped = [];
		
		this.$flop = $("<ul class='flop'></ul>");
		
		this.$deck = $("<div class='deck'></div>");
		
		this.buildDeck(cards);
	},
	
	/**
	 * Shuffle deck.
	 * 
	 * Adapted from:
	 * + Jonas Raoni Soares Silva
	 * @ http://jsfromhell.com/array/shuffle [v1.0]
	 */
	shuffle: function() {
		var o = this._cards;
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
		return this;
	},
	
	/**
	 * Draw top card of the deck.
	 */
	draw: function() {
		this._flopped.push(this._cards.pop());
		this.print();
	},
	
	/**
	 * Draw deck.
	 */
	print: function() {
		
		//this.$deck.text(this._cards.length);
		this.$flop.empty();
		for (var lcv = 0; lcv < this._flopped.length; lcv++) {
			var c = this._flopped[lcv];
			this.$flop.append("<li>" + c.name + "</li>");
		}
		
		/*this.$deck.html("<ul></li>");
		
		for (var lcv = 0; lcv < this._cards.length; lcv++) {
			var c = this._cards[lcv];
			this.$deck.append("<li>" + c.name + "</li>");
		}*/
		return this;
	},
	
    buildDeck: function(cards) {
		this.$deck.empty()
             .append($("<p>Loading cards...</p>"));
        this._cards = [];
		
		this.$deck.empty();
		
		for (var lcv = 0; lcv < cards.length; lcv++) {
			var card = cards[lcv];
			var cf = card.data.frequency ? card.data.frequency : 1;
			var frequency = cf;
			
			for (var f = 0; f < frequency; f++) {
				this._cards.push(card);
			}
		}
		
		this.$deck.append(this.$flop).click($.proxy(function() {
			this.draw();
		}, this));
		
		this.shuffle();
		this.print();
    }
});