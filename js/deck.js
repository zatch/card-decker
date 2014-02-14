// -----------------------------------------------------------------------------
// Stage Class
// -----------------------------------------------------------------------------
var Deck = EventEmitter.extend({
	
	$deck: null,
	$flop: null,
	_cards: null,
	_flopped: null,
	
	init: function (cards) {
		this._super();
		
		this._cards = cards;
		this._flopped = [];
		
		this.$flop = $("<ul class='flop'></ul>");
		
		this.$deck = $("<div class='deck'></div>");
		
		this.getBoards("members/me/boards");
	},
	
	/**
	 * Shuffle deck.
	 * 
	 * Adapted from:
	 * + Jonas Raoni Soares Silva
	 * @ http://jsfromhell.com/array/shuffle [v1.0]
	 */
	shuffle: function() {
		var o = this._cards;
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
		return this;
	},
	
	/**
	 * Draw top card of the deck.
	 */
	draw: function() {
		this._flopped.push(this._cards.pop());
		this.print();
	},
	
	/**
	 * Draw deck.
	 */
	print: function() {
		
		//this.$deck.text(this._cards.length);
		this.$flop.empty();
		for (var lcv = 0; lcv < this._flopped.length; lcv++) {
			var c = this._flopped[lcv];
			this.$flop.append("<li>" + c.name + "</li>");
		}
		
		/*this.$deck.html("<ul></li>");
		
		for (var lcv = 0; lcv < this._cards.length; lcv++) {
			var c = this._cards[lcv];
			this.$deck.append("<li>" + c.name + "</li>");
		}*/
		return this;
	},
	
    getCards: function(uri) {
        var self = this;
		self.$deck.empty()
             .append($("<p>Loading cards...</p>"));
        self._cards = [];
		
        // Output a list of all of the cards that the member 
        // is assigned to
        Trello.get(uri, {"checklists": "all"}, function(cards) {
            self.$deck.empty();
            
            $.each(cards, function(ix, card) {
                var frequency = 1;
                for (var lcv = 0; lcv < card.checklists.length; lcv++) {
                    var list = card.checklists[lcv];
                    if (list.name === "data") {
                        var dataItems = list.checkItems;
                        for (var i = 0; i < dataItems.length; i++) {
                            var itemPair = dataItems[i].name.split(":");
                            // Only consider true pairs.
                            if (itemPair.length === 2) {
                                var itemKey = itemPair[0].trim();
                                var itemVal = itemPair[1].trim();
                                
                                if (itemKey === "frequency") {
                                    frequency = itemVal;
                                }
                            }
                        }
                        break;
                    }
                }
                
                var c = {
                    name: card.name,
                    desc: card.desc
                };
                
                for (var lcv = 0; lcv < frequency; lcv++) {
                    self._cards.push(c);
                }
            });
			
			self.$deck.append(self.$flop).click($.proxy(function() {
				self.draw();
			}, self));
			
			self.shuffle();
            self.print();
        });
    },
    
    getLists: function(uri) {
        var $lists = $("<select class='list-select'></select>")
			.appendTo(this.$deck)
            .append($("<option value='' selected>Loading lists...</option>"));
        var self = this;
        // Output a list of all of the cards that the member 
        // is assigned to
        Trello.get(uri, function(lists) {
            $lists.empty()
            .append($("<option value='' selected>Select list</option>"));
            
            $.each(lists, function(ix, list) {
                $("<option></option>")
                .attr({value: list.id})
                .text(list.name)
                .appendTo($lists);
            });
            
            $lists.change(function(e) {
                // Get new lists to display when a board is selected.
                $selected = $("option:selected", e.delegateTarget);
                self.getCards("/lists/" + $selected.val() + "/cards");
            });
        });
    },
    
    getBoards: function(uri) {
        var $boards = $("<select class='board-select'></select>")
			.appendTo(this.$deck)
            .append($("<option value='' selected>Loading boards...</option>"));
        var self = this;
        // Output a list of all of the cards that the member 
        // is assigned to
        Trello.get(uri, function(boards) {
            $boards.empty()
            .append($("<option value='' selected>Select board</option>"));
            
            $.each(boards, function(ix, board) {
                $("<option></option>")
                .attr({value: board.id})
                .text(board.name)
                .appendTo($boards);
            });
            
            $boards.change(function(e) {
                // Get new lists to display when a board is selected.
                $selected = $("option:selected", e.delegateTarget);
                self.getLists("/boards/" + $selected.val() + "/lists");
            });
        });
    }
});