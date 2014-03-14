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
			var pileData = {"type":"deck","name":"Test Deck (for app testing)","cards":[{"name":"Shield","desc":"asdf","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8da/98ec1582badd1bda88e324a39970a77d/images.jpeg"},{"name":"Club","desc":"","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8e4/b4abe977d478f3abf60ac29f273c0469/Inuit_prehistoric_wooden_club.jpg"},{"name":"Saber","desc":"","data":{"frequency":"6"},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8dd/078abd469bc924b34cb77a4225021b8e/saber.jpg"},{"name":"Common Spear","desc":"","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8e8/f7555493984d58f55dec40f3372592d0/images.jpeg"},{"name":"Wire Cutters","desc":"+1 to disable traps","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8e2/87113f1c7b5f7d740e145ddca18d6169/%24T2eC16FHJGgFFm%2BcPy1OBRkL)m!82g~~60_35.JPG"},{"name":"Mousefoot Shoes","desc":"+1 to stealth","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8d8/536115a5b0fb841109afbdf682fc18bf/m0PSGWK_PGTFwDQF1nQcTfw.jpg"},{"name":"Shadow Cloak","desc":"+2 to Stealth","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8e6/9bdf873ba4bbac7873e04d9ea83c1ce5/I-010_20Cloak_20of_20Shadow_20100.jpg"},{"name":"Lockpicks","desc":"+1 to pick locks","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8d6/446ea45572e50c7254a6288b1a1448a3/2.jpg"},{"name":"Spell","desc":"A magic spell, useable by a wizard","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8ed/b13e717f4743a1cd4d81b159bdbd792b/4F6_MagicScroll1_bg.png"},{"name":"Faithful Hound","desc":"This dog has a special loyalty to one hero.\n\nAlert: The player in possession of this card is immune to surprise","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8ee/8bf5837615542e8c5630106c60cd4d5b/BASSETT-HOUND-BEACH-FACE.jpg"},{"name":"Potion of Good Health","desc":"This small bottle contains a liquid that heals wounds.\n\nHeals 1d4+1 points of health","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8dc/e2a2f25c183e226175c132305f887a38/level_2_health_potion___open_by_adorabless-d66diis.png"},{"name":"Shining Sword","desc":"*While unsheathed, this sword makes the room about as bright as you could possibly want it to be.*\n\nWielding this sword fully illuminates the entire floor.\n\n*During your turn you may freely utter the magic words of intensification, making the sword absolutely unpleasant.*\nFree-Action\n**Arcana** (pass): The floor becomes **too bright**.  All normal-vision creatures suffer -2 to visual checks.  Creatures with dark-vision instead suffer -5 to visual checks.  A successful free action arcana check returns the sword to normal.  An adjacent creature may attempt an arcana check at a -5 penalty to brighten or unbrighten the sword.\n\nDamage: 1d8","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8e1/2f343b608a1f8798f20b140fb3a19246/gally04.png"},{"name":"Bearded Axe","desc":"An axe that's forged with a hook-like beard, useful for grabbing an enemy's shield or limb.\n\n-D6 damage\n-On a successful hit, the Bearded Axe causes -1 to the enemy's Defense for the remainder of the battle.","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8de/158a6b6e419851c32a8bd9e31abd0e1b/BeardedAxe.jpg"},{"name":"Treasure Map","desc":"+50 gp for next gained treasure.","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8db/06c95d4137dda38d61b6d35e5ddc8a88/Treasure_Map_7107.jpg"},{"name":"Shield of Faith","desc":"+1 to defense, +2 vs. undead enemies","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8df/0492521b3ede2dc77bc43406c059b769/paulphillips-1297010564.jpg"},{"name":"Typical Dagger","desc":"*Common as dirt, mostly because they work so good at putting enemies underground.  Also, this one smells like an old boot.*\n\n**Thievery** (minor action)\nPass: you hide or unhide the dagger.\nFail: you suffer 1 damage and drop the dagger and curse loudly.\n\nSmall, Throwable\n\nDamage: 1d4\nDamage if you were sneaky about it: 1d4+2d6","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8ea/6b21361cfa2594b591d7e31078e3c297/collection-dagger-19100.jpg"},{"name":"Double Sword","desc":"*One minute this weapon feels like the best idea ever, and the next minute it feels like maybe it was meant as a ceremonial art piece*\n\nMake two attacks with this weapon.  If both attacks miss, you hit yourself.\n\nDamage: d8","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8eb/0cf99ebcc13ae10bb9433975b2dd84dc/XL1352.jpg"},{"name":"Arcane Shurikens","desc":"*Each shuriken is forged in a shape of a mystic rune, and radiates a bit of heat, cold, or less explicable sensations into your fingertips*\n\nRoll **Arcana** or **Perception** to identify a shuriken's properties when you hit\n\n**Arcana**\nSuccess: search the deck for a spell and cast the spell on your target, plus 1d4 damage (discard on a 4).  \n\nFailure: reveal cards until you reveal a spell and the spell is cast on the target, plus 1d4 plain damage (discard on a 4).\n\n**Perception**\nSuccess: choose an element, deal 1d4 plain damage, and 2d4 elemental damage (discard on double 4s).\n\nFailure: DM chooses an element, deal 1d4 plain damage, and 2d4 elemental damage (discard on double 4s).\n\n","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8e3/5ea0373705db60dcc682b2db8b1f7a97/FF7_Magic_shuriken.jpg"},{"name":"Steel Broadheads","desc":"*High quality steel, masterfully forged into deadly arrowheads.  You don't see a quiverfull of these everyday*\n\nDamage: 2d6 (discard on doubles)","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8e0/7b52f1cfc42eaaeba1d1ecaa1f8dc5aa/2013221163117-toxic_broadheads_m.jpg"},{"name":"Adamantine Arrows","desc":"*Adamantine flakes are impossible to sharpen, but they are naturally pretty sharp already, and make arrows or bolts that repair easily*\n\nDamage: 2d4 (discard on double 4s)","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8d9/8c4ed7704cdf63e3a807c58ddafb8aed/Adamantine_Arrow.jpg"},{"name":"Lockbox","desc":"A locked box requires a key to open.  Upon opening, draw the top card from the deck.  If whatever was on the card could fit in a carried box, add that card to your inventory.","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8ec/ff25c1eb5efa79853cc1dd68fb505ac1/Lockbox.jpg"},{"name":"Glass Sword","desc":"Immediately kills any living creature upon striking them.  Shatters on impact.  No affect on undead or magically animated creatures.","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8d7/4866db6c206b92fdd0dff9d205d09cab/LongSword.png"},{"name":"Steel Helm","desc":"","data":{},"cover":"https://trello-attachments.s3.amazonaws.com/52f6da3777090b7f16b2b909/52f997068e3e10546e9af8e5/ee7f055f6ec8e7b59740a58de857d863/helm_GB336.jpg"}]};
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
			cancel: ".card-wrapper"
		});
		
		var $pName = $("<div class='pile-name'>" + pile.name() + "</div>");
		
		var $cardContainer = $("<div class='card-container'></div>")
		.sortable({
			placeholder: "card-sort-placeholder",
			appendTo: document.body,
			helper: "clone",
			handle: ".card-btn-move",
			connectWith: ".pile:not(.deck) .card-container",
			items: ".card-wrapper",
			accept: ".card-wrapper",
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
		var $cWrapper = $("<div class='card-wrapper'></div>")
		.data({card: card});
		
		var $c = $("<div class='card'></div>");
		
		var $cBack = $("<div class='back face'></div>");
		
		var $cFront = $("<div class='front face'></div>");
		
		var $cName = $("<div class='name'></div>")
			.text(card.name());
			
		var $cCover = $("<img class='cover' alt='card art' src='" + card.cover() + "'/>");
		
		
		var $cOverlay = $("<div class='card-overlay'></div>");
		
		$("<div class='card-btn card-btn-flip'></div>")
		.appendTo($cOverlay)
		.click(function() {
			$cWrapper.toggleClass("face-up");
		});
		
		$("<div class='card-btn card-btn-tap'></div>").appendTo($cOverlay);
		$("<div class='card-btn card-btn-blank'></div>").appendTo($cOverlay);
		$("<div class='card-btn card-btn-menu'></div>").appendTo($cOverlay);
		$("<div class='card-btn card-btn-move'></div>").appendTo($cOverlay);
		
		
		$cFront.append($cName).append($cCover);
		$c.append($cBack).append($cFront).append($cOverlay);
		$cWrapper.append($c);
		
		card.$el($cWrapper);
		return $cWrapper;
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