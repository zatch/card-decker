// -----------------------------------------------------------------------------
// Deck Class
// -----------------------------------------------------------------------------
var Deck = Pile.extend({
	
	_drawpile: null,
	_inPlay: null,
	
	init: function (cards) {
		this._super(cards);
	},
	
	nextCard: function() {
		return this._drawpile[this._drawpile.length - 1];
	},
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case SomeComponent.SOME_EVENT:
                // Do stuff.
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '" + type + "' passed to Deck");
        }
    }
});

/*
 * Define constants for Event types.
 */
Deck.CREATED = "deckCreated";
Deck.SHUFFLED = "deckShuffled";
Deck.CARD_CREATED = "cardCreated";