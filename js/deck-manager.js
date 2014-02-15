var DeckManager = EventEmitter.extend({
    
    _decks: null,
    
    init: function () {
        // TODO
        
        // Scope event handlers.
        this._onCardsReady = $.proxy(this._onCardsReady, this);
    },
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case TrelloIO.CARDS_READY:
                this._onCardsRead(data);
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '", type, "' passed to Deck Manager");
        }
    },
    
    _onCardsReady: function (eventData) {
        buildDecks(eventData);
    },
    
    /**
     * Create decks from the given data.
     * @param decks {Array} An array of Objects representing Decks.
     * @return Void
     */
    buildDecks: function (decks) {
        this._decks = [];
        
        var ilen = decks.length,
            i    = 0;
        for(; i<ilen; i++) {
            this._decks.push( new Deck(decks[i]) );
        }
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