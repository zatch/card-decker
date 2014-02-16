// -----------------------------------------------------------------------------
// Card Class
// -----------------------------------------------------------------------------
var Card = EventEmitter.extend({
	
    name: null,
    description: null,
	_data: null,
	
	init: function (cardData) {
		this._super();
		this.name = cardData.name;
		this.desc = cardData.desc;
		this._data = cardData.data;
	},
    
    handleEvent: function (type, target, data) {
/*        switch (type) {
            case TrelloIO.CARDS_READY:
                this._onCardsRead(data);
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '", type, "' passed to Card");
        }*/
    },
    
    _onSomeEvent: function (eventData) {
        
    }
});

/*
 * Define constants for Event types.
 */
Card.CREATED = "cardCreated";