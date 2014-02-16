// -----------------------------------------------------------------------------
// UIManager Class
// -----------------------------------------------------------------------------
var UIManager = EventEmitter.extend({
	
    decks: null,
    $addDeckBtn: null,
    $decksContainer: null,
	
	init: function () {
		this._super();
        
        this.decks = [];
        this.$addDeckBtn = $("#add-deck-btn");
        this.$decksContainer = $("#decks-container");
	},
    
    handleEvent: function (type, target, data) {
        switch (type) {
            case TrelloIO.CARDS_READY:
                this._onTrelloIOCardsReady(data);
                break;
            case DeckManager.DECK_CREATED:
                this._onDeckCreated(data);
                break;
            // ... other event routing happens here.
            default:
                throw new Error("Unknown event type, '", type, "' passed to UI Manager");
        }
    },
    
    _onTrelloIOCardsReady: function (eventData) {
        var self = this;
        this.$addDeckBtn.unbind("click").click(function() {
            self.trigger(UIManager.ADD_DECK, eventData);
        });
    },
    
    _onDeckCreated: function(eventData) {
		var $d = $("<div class='deck'></div>")
        .click($.proxy(function() {
			this.trigger(UIManager.DECK_CLICKED, eventData);
		}, this))
        .appendTo(this.$decksContainer);
        
        this.decks.push({deck: eventData, $el: $d});
    }
});
UIManager.ADD_DECK = "uiAddDeck";
UIManager.DECK_CLICKED = "uiDeckClicked";