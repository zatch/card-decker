// -----------------------------------------------------------------------------
// UIManager Class
// -----------------------------------------------------------------------------
var UIManager = EventEmitter.extend({
	
    piles: null,
    $pilesContainer: null,
    $addDeckBtn: null,
	
	init: function () {
		this._super();
        
        var self = this;
		
        this.piles = [];
        this.$addDeckBtn = $("#add-deck-btn");
        this.$addMatBtn = $("#add-mat-btn");
        this.$pilesContainer = $("#piles-container");
		
        this.$addMatBtn.unbind("click").click(function() {
            self.trigger(UIManager.ADD_PILE, {type: "mat"});
        });
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
		var pile = eventData;
		
		var $d = $("<div class='" + pile.type() + "'></div>")
        .appendTo(this.$pilesContainer);
        
		pile.bind(Card.ACTIVATED, $.proxy(this.handleEvent, this));
		
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
			if (eventData.container() === this.piles[lcv].pile) {
				this.piles[lcv].$el.append($c);
			}
		}
		
    }
});
UIManager.ADD_PILE = "uiAddPile";