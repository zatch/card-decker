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
		
		this._createPileEl(pile).appendTo(this.$pilesContainer);
		
		pile.bind(Card.ACTIVATED, $.proxy(this.handleEvent, this));
		
		var cards = pile.getCards();
		for (var lcv = 0; lcv < cards.length; lcv++) {
			cards[lcv];
		}
		
        this.piles.push(pile);
    },
	
	_createPileEl: function(pile) {
		var $p = $("<div class='pile " + pile.type() + "'></div>")
		.data({pile: pile})
		.droppable({
			drop: this._handlePileDropEvent
		});
		
		pile.$el($p);
		return $p;
	},
	
	_handlePileDropEvent: function(event, ui) {
		var $pile = $(event.target);
		var $card = ui.draggable;
		$card.appendTo($pile);
	},
	
	_handleCardStopDragEvent: function(event, ui) {
		var $card = $(event.target);
		$card.removeAttr('style');
	},
	
	_createCardEl: function(card) {
		var $c = $("<div class='card'></div>")
		.data({card: card});
		
		var $cback = $("<div class='back'></div>");
		
		var $cfront = $("<div class='front'></div>");
		
		var $cname = $("<div class='name'></div>")
			.text(card.name())
			.appendTo($cfront);
			
		$cfront.append($cname);
		$c.append($cfront).append($cback);
		
		$c.draggable( {
			cursor: 'move',
			snap: '#content',
			stop: this._handleCardStopDragEvent
		});
		
		card.$el($c);
		return $c;
	},
    
    _onCardActivated: function(eventData) {
		var card = eventData;
		var $card = this._createCardEl(card);
		card.container().$el().append($card);
    }
});
UIManager.ADD_PILE = "uiAddPile";