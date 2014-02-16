// -----------------------------------------------------------------------------
// Deck Class
// -----------------------------------------------------------------------------
var Deck = EventEmitter.extend({
	
	_drawpile: null,
	_inPlay: null,
	
	init: function (cards) {
		this._super();
		
		this._drawpile = [];
		this._inPlay = [];
		
		this._buildDeck(cards);
		this.trigger(Deck.CREATED, this);
	},
	
	/**
	 * Shuffle deck.
	 * 
	 * Adapted from:
	 * + Jonas Raoni Soares Silva
	 * @ http://jsfromhell.com/array/shuffle [v1.0]
	 */
	shuffle: function() {
		var o = this._drawpile;
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
		this.trigger(Deck.SHUFFLED, this);
		return this;
	},
	
	/**
	 * Draw top card of the deck.
	 */
	draw: function() {
		this._inPlay.push(this._drawpile.pop());
	},
	
    _buildDeck: function(cards) {
		for (var lcv = 0; lcv < cards.length; lcv++) {
			var card = cards[lcv];
			var cf = card.data.frequency ? card.data.frequency : 1;
			var frequency = cf;
			
			for (var f = 0; f < frequency; f++) {
				this._drawpile.push(new Card(card));
			}
		}
		
		this.shuffle();
    },
	
	nextCard: function() {
		return this._drawpile[this._drawpile.length - 1];
	},
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case UIManager.ADD_DECK:
                this._buildDeck(data);
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '", type, "' passed to Deck");
        }
    }
});

/*
 * Define constants for Event types.
 */
Deck.CREATED = "deckCreated";
Deck.SHUFFLED = "deckShuffled";
Deck.CARD_CREATED = "cardCreated";