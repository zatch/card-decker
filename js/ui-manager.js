// -----------------------------------------------------------------------------
// UIManager Class
// -----------------------------------------------------------------------------
var UIManager = EventEmitter.extend({
	
    piles: null,
    $addDeckBtn: null,
    $decksContainer: null,
	
	init: function () {
		this._super();
        
        this.piles = [];
        this.$addDeckBtn = $("#add-deck-btn");
        this.$decksContainer = $("#decks-container");
	},
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case TrelloIO.CARDS_READY:
                this._onTrelloIOCardsReady(data);
                break;
            case PileManager.PILE_CREATED:
                this._onPileCreated(data);
                break;
            case Card.ACTIVATED:
                this._onCardActivated(data);
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '" + type + "' passed to UI Manager");
        }
    },
    
    _onTrelloIOCardsReady: function (eventData) {
        var self = this;
		var pileData = {
			type: "deck",
			cards: eventData
		};
        this.$addDeckBtn.unbind("click").click(function() {
            self.trigger(UIManager.ADD_PILE, pileData);
        });
    },
    
    _onPileCreated: function(eventData) {
		var $d = $("<div class='deck'></div>")
        .appendTo(this.$decksContainer);
        
		var pile = eventData;
		pile.bind(Card.ACTIVATED, $.proxy(this.handleEvent, this));
		/*var cards = pile.getCards();
		for (var lcv = 0; lcv < cards.length; lcv++) {
			cards[lcv].bind(Card.ACTIVATED, $.proxy(this.handleEvent, this));
		}*/
		
        this.piles.push({pile: pile, $el: $d});
    },
    
    _onCardActivated: function(eventData) {
		var card = eventData;
		var $c = $("<div class='card'></div>");
		var $cback = $("<div class='back'></div>")
			.appendTo($c);
		var $cfront = $("<div class='front'></div>")
			.appendTo($c);
		var $cname = $("<div class='name'></div>")
			.text(card.name())
			.appendTo($cfront);
		
		// TODO: Figure out a better way to get a reference to the containing pile.
		for (var lcv = 0; lcv < this.piles.length; lcv++) {
			// TODO: Remove ref to private Card _container prop.
			if (eventData._container === this.piles[lcv].pile) {
				this.piles[lcv].$el.append($c);
			}
		}
		
    }
});
UIManager.ADD_PILE = "uiAddPile";