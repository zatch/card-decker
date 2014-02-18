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
        
        this.piles.push({pile: eventData, $el: $d});
    }
});
UIManager.ADD_PILE = "uiAddPile";