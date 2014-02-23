// -----------------------------------------------------------------------------
// Mat Class
// -----------------------------------------------------------------------------
var Mat = Pile.extend({
	
	_cardsInDeck: null,
	
	init: function () {
		this._super();
		this.type("mat");
	},
	
	activate: function() {
		
	}/*,
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case SomeComponent.SOME_EVENT:
                // Do stuff.
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '" + type + "' passed to Deck");
        }
    }*/
});

/*
 * Define constants for Event types.
 */
Mat.CREATED = "matCreated";