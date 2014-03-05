// -----------------------------------------------------------------------------
// Pile Class
// -----------------------------------------------------------------------------
var Pile = EventEmitter.extend({
	
	_$el: null,
    _name: null,
	_type: null,
	_cards: null,
	
	init: function () {
		this._super();
		this._cards = [];
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
	
	type: function(value) {
		if (!!value) {
			this._type = value;
			return this;
		}
		return this._type;
	},
	
	addCards: function(cards) {
		for (var lcv = 0; lcv < cards.length; lcv++) {
			var c = cards[lcv];
			c.name = c.name ? c.name : "[no name]";
			c.desc = c.desc ? c.desc : "[no description]";
			c.data = c.data ? c.data : {};
			var cf = c.data.frequency ? c.data.frequency : 1;
			var frequency = cf;
			
			for (var f = 0; f < frequency; f++) {
				this._cards.push(
					new Card()
					.bind(Card.ACTIVATED, $.proxy(this.handleEvent, this))
					.name(c.name)
					.description(c.desc)
					.data(c.data)
					.container(this)
					.owner(this)
				);
			}
		}
		return this;
	},
	
	/**
	 * Shuffle pile.
	 * 
	 * Adapted from:
	 * + Jonas Raoni Soares Silva
	 * @ http://jsfromhell.com/array/shuffle [v1.0]
	 */
	shuffle: function() {
		var o = this._cards;
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
		this.trigger(Pile.SHUFFLED, this);
		return this;
	},
	
	getCards: function() {
		return this._cards;
	},
	/*
    _buildPile: function(cards) {
		for (var lcv = 0; lcv < cards.length; lcv++) {
			var card = cards[lcv];
			var cf = card.data.frequency ? card.data.frequency : 1;
			var frequency = cf;
			card.owner = this;
			
			for (var f = 0; f < frequency; f++) {
				this._cards.push(new Card(card, this, [{type: Card.ACTIVATED, handler: $.proxy(this.handleEvent, this)}]));
			}
		}
    },*/
	
	_activateCard: function(card) {
		card.container(this).activate();
	},
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case Card.ACTIVATED:
                // Bubble event.
				this.trigger(type, target, data);
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