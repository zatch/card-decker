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
		this.$addDeckBtn.unbind("click").click(function() {
			var pileData = {"type":"deck","name":"Test Deck","cards":[{"name":"Saber","desc":"","data":{"frequency":"6"}},{"name":"Shield","desc":"asdf","data":{}},{"name":"Club","desc":"","data":{}},{"name":"Common Spear","desc":"","data":{}},{"name":"Wire Cutters","desc":"+1 to disable traps","data":{}},{"name":"Mousefoot Shoes","desc":"+1 to stealth","data":{}},{"name":"Shadow Cloak","desc":"+2 to Stealth","data":{}},{"name":"Lockpicks","desc":"+1 to pick locks","data":{}},{"name":"Spell","desc":"A magic spell, useable by a wizard","data":{}},{"name":"Faithful Hound","desc":"This dog has a special loyalty to one hero.\n\nAlert: The player in possession of this card is immune to surprise","data":{}},{"name":"Third Shard of the Sword of Empire","desc":"Once reforged, the Sword of Empire is a +2 longsword\n\nInspiration: once per every five rooms, the sword can give +1 Attack to all allies","data":{}},{"name":"Second Shard of the Sword of Empire","desc":"","data":{}},{"name":"Potion of Good Health","desc":"This small bottle contains a liquid that heals wounds.\n\nHeals 1d4+1 points of health","data":{}},{"name":"Shining Sword","desc":"*While unsheathed, this sword makes the room about as bright as you could possibly want it to be.*\n\nWielding this sword fully illuminates the entire floor.\n\n*During your turn you may freely utter the magic words of intensification, making the sword absolutely unpleasant.*\nFree-Action\n**Arcana** (pass): The floor becomes **too bright**. All normal-vision creatures suffer -2 to visual checks. Creatures with dark-vision instead suffer -5 to visual checks. A successful free action arcana check returns the sword to normal. An adjacent creature may attempt an arcana check at a -5 penalty to brighten or unbrighten the sword.\n\nDamage: 1d8","data":{}},{"name":"Bearded Axe","desc":"An axe that's forged with a hook-like beard, useful for grabbing an enemy's shield or limb.\n\n-D6 damage\n-On a successful hit, the Bearded Axe causes -1 to the enemy's Defense for the remainder of the battle.","data":{}},{"name":"Treasure Map","desc":"+50 gp for next gained treasure.","data":{}},{"name":"Shield of Faith","desc":"+1 to defense, +2 vs. undead enemies","data":{}},{"name":"Typical Dagger","desc":"*Common as dirt, mostly because they work so good at putting enemies underground. Also, this one smells like an old boot.*\n\n**Thievery** (minor action)\nPass: you hide or unhide the dagger.\nFail: you suffer 1 damage and drop the dagger and curse loudly.\n\nSmall, Throwable\n\nDamage: 1d4\nDamage if you were sneaky about it: 1d4+2d6","data":{}},{"name":"Double Sword","desc":"*One minute this weapon feels like the best idea ever, and the next minute it feels like maybe it was meant as a ceremonial art piece*\n\nMake two attacks with this weapon. If both attacks miss, you hit yourself.\n\nDamage: d8","data":{}},{"name":"Arcane Shurikens","desc":"*Each shuriken is forged in a shape of a mystic rune, and radiates a bit of heat, cold, or less explicable sensations into your fingertips*\n\nRoll **Arcana** or **Perception** to identify a shuriken's properties when you hit\n\n**Arcana**\nSuccess: search the deck for a spell and cast the spell on your target, plus 1d4 damage (discard on a 4). \n\nFailure: reveal cards until you reveal a spell and the spell is cast on the target, plus 1d4 plain damage (discard on a 4).\n\n**Perception**\nSuccess: choose an element, deal 1d4 plain damage, and 2d4 elemental damage (discard on double 4s).\n\nFailure: DM chooses an element, deal 1d4 plain damage, and 2d4 elemental damage (discard on double 4s).\n\n","data":{}},{"name":"Steel Broadheads","desc":"*High quality steel, masterfully forged into deadly arrowheads. You don't see a quiverfull of these everyday*\n\nDamage: 2d6 (discard on doubles)","data":{}},{"name":"Adamantine Arrows","desc":"*Adamantine flakes are impossible to sharpen, but they are naturally pretty sharp already, and make arrows or bolts that repair easily*\n\nDamage: 2d4 (discard on double 4s)","data":{}},{"name":"Lockbox","desc":"A locked box requires a key to open. Upon opening, draw the top card from the deck. If whatever was on the card could fit in a carried box, add that card to your inventory.","data":{}},{"name":"Glass Sword","desc":"Immediately kills any living creature upon striking them. Shatters on impact. No affect on undead or magically animated creatures.","data":{}},{"name":"Steel Helm","desc":"","data":{}}]};
			self.trigger(UIManager.ADD_PILE, pileData);
        });
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
			name: eventData.name,
			cards: eventData.cards
		};
        this.$addDeckBtn.unbind("click").click(function() {
            self.trigger(UIManager.ADD_PILE, pileData);
        });
    },
    
    _onPileCreated: function(eventData) {
		var pile = eventData;
		
		this._createPileEl(pile).appendTo(this.$pilesContainer);
		
		pile.bind(Card.ACTIVATED, $.proxy(this.handleEvent, this));
		
		switch (pile.type()) {
			case "deck":
				pile.activateNextCard();
				break;
			case "mat":
				break;
			default:
				break;
		}
		
        this.piles.push(pile);
    },
	
	_createPileEl: function(pile) {
		var $p = $("<div class='pile " + pile.type() + "'></div>")
		.data({pile: pile})
		.draggable({
			appendTo: document.body,
			zIndex: 100,
			cancel: ".card"
		});
		
		var $pName = $("<div class='pile-name'>" + pile.name() + "</div>");
		
		var $cardContainer = $("<div class='card-container'></div>")
		.sortable({
			placeholder: "card-sort-placeholder",
			appendTo: document.body,
			helper: "clone",
			connectWith: ".pile:not(.deck) .card-container",
			items: ".card",
			accept: ".card",
			zIndex: 100,
			stop: this._handlePileStopSortEvent,
			receive: this._handlePileReceiveSortEvent
		});
		
		switch (pile.type()) {
			case "deck":
				break;
			case "mat":
				$p.resizable({handles: "e"});
				break;
			default:
				break;
		}
		
		$p.append($pName)
		.append($cardContainer);
		
		pile.$el($p);
		return $p;
	},
    
    _onCardActivated: function(eventData) {
		var card = eventData;
		var $card = this._createCardEl(card);
		$card.appendTo($(".card-container", card.container().$el()));
    },
	
	_createCardEl: function(card) {
		var $c = $("<div class='card'></div>")
		.data({card: card})
		.click(function() {
			$(this).toggleClass("face-up");
		});
		
		var $cback = $("<div class='back face'></div>");
		
		var $cfront = $("<div class='front face'></div>");
		
		var $cname = $("<div class='name'></div>")
			.text(card.name());
			
		$cfront.append($cname);
		$c.append($cback).append($cfront);
		
		card.$el($c);
		return $c;
	},
	
	_handlePileReceiveSortEvent: function(event, ui) {
		var $card = ui.item;
		var card = $card.data().card;
		
		var $oldPile = ui.sender;
		var oldPile = $oldPile.parent().data().pile;
		
		var $newPile = $(event.target);
		var newPile = $newPile.parent().data().pile;
		
		// Handle Card and Pile updates.
		card.container(newPile);
		
		// Handle updates for specific Pile types.
		switch (oldPile.type()) {
			case "deck":
				oldPile.activateNextCard();
				break;
			case "mat":
				break;
			default:
				break;
		}
	},
	
	_handlePileStopSortEvent: function(event, ui) {
		
	}
});
UIManager.ADD_PILE = "uiAddPile";