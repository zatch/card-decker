// -----------------------------------------------------------------------------
// Pile Class
// -----------------------------------------------------------------------------
var Pile = EventEmitter.extend({
	
	_drawpile: null,
	_inPlay: null,
	
	init: function (cards) {
		this._super();
		this._drawpile = [];
		this._inPlay = [];
		
		this._buildPile(cards);
		this.trigger(Pile.CREATED, this);
	},
	
	/**
	 * Shuffle pile.
	 * 
	 * Adapted from:
	 * + Jonas Raoni Soares Silva
	 * @ http://jsfromhell.com/array/shuffle [v1.0]
	 */
	shuffle: function() {
		var o = this._drawpile;
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
		this.trigger(Pile.SHUFFLED, this);
		return this;
	},
	
    _buildPile: function(cards) {
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
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case SomeComponent.SOME_EVENT:
                // Do stuff.
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '" + type + "' passed to Pile");
        }
    }
});

/*
 * Define constants for Event types.
 */
Pile.CREATED = "pileCreated";
Pile.SHUFFLED = "pileShuffled";
Pile.CARD_CREATED = "cardCreated";