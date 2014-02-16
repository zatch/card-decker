var DeckManager = EventEmitter.extend({
    
    _decks: null,
    
    init: function () {
		this._super();
		
        // TODO
        
        this._decks = [];
        
        // Scope event handlers.
        this._buildDeck = $.proxy(this._buildDeck, this);
    },
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case UIManager.ADD_DECK:
                this._buildDeck(data);
                break;
            case UIManager.DECK_CLICKED:
                console.log(data);
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '", type, "' passed to Deck Manager");
        }
    },
    
    /**
     * Create decks from the given data.
     * @param decks {Array} An array of Objects representing Decks.
     * @return Void
     */
    _buildDeck: function (cards) {
        this._decks.push( new Deck(cards) );
        this.trigger(DeckManager.DECK_CREATED, this._decks[this._decks.length - 1]);
    },
    
    /**
     * Return the specified Deck object or FALSE if the deck doesn't exist.
     * @param id {String} The ID of the deck to return.
     * @return Deck
     */
    getDeck: function (id) {
        // TODO: Implement DeckManager.getDeck().
    }
});
DeckManager.DECK_CREATED = "deckCreated";