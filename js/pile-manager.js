var PileManager = EventEmitter.extend({
    
    _piles: null,
    
    init: function () {
		this._super();
		
        // TODO
        
        this._piles = [];
        
        // Scope event handlers.
        this._buildPile = $.proxy(this._buildPile, this);
    },
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case UIManager.ADD_PILE:
                this._buildPile(data);
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '" + type + "' passed to Pile Manager");
        }
    },
    
    /**
     * Create piles from the given data.
     * @param data {Object} Contains type and cards data for piles to build.
     * @return Void
     */
    _buildPile: function (data) {
		switch (data.type) {
            case "deck":
				this._piles.push( new Deck(data.cards) );
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Cannot build unknown pile type, '" + type);
		}
		this.trigger(PileManager.PILE_CREATED, this._piles[this._piles.length - 1]);
    },
    
    /**
     * Return the specified Pile object or FALSE if the pile doesn't exist.
     * @param id {String} The ID of the pile to return.
     * @return Pile
     */
    getPile: function (id) {
        // TODO: Implement PileManager.getPile().
    }
});
PileManager.PILE_CREATED = "pileCreated";