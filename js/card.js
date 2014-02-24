// -----------------------------------------------------------------------------
// Card Class
// -----------------------------------------------------------------------------
var Card = EventEmitter.extend({
	
	_$el: null,
    _name: null,
    _description: null,
	_data: null,
	_owner: null,
	_container: null,
	
	init: function (cardData, owner) {
		this._super();
		return this;
	},
	
	$el: function(value) {
		if (!!value) {
			this._$el = value;
			return this;
		}
		return this._$el;
	},
	
	name: function(value) {
		if (!!value) {
			this._name = value;
			return this;
		}
		return this._name;
	},
	
	description: function(value) {
		if (!!value) {
			this._description = value;
			return this;
		}
		return this._description;
	},
	
	data: function(value) {
		if (!!value) {
			this._data = value;
			return this;
		}
		return this._data;
	},
	
	owner: function(value) {
		if (!!value) {
			this._owner = value;
			return this;
		}
		return this._owner;
	},
	
	container: function(value) {
		if (!!value) {
			this._container = value;
			return this;
		}
		return this._container;
	},
	
	activate: function() {
		this.trigger(Card.ACTIVATED, this);
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
Card.ACTIVATED = "cardActivated";