// -----------------------------------------------------------------------------
// TrelloIO Class
// -----------------------------------------------------------------------------
var TrelloIO = EventEmitter.extend({
	
    _boards: null,
	
	init: function () {
		this._super();
        
        Trello.authorize({
            interactive:false,
            success: $.proxy(this.onAuthorize, this)
        });
        
        $("#connectLink")
        .click(function(){
            Trello.authorize({
                type: "popup",
                success: onAuthorize
            });
        });
        
        $("#disconnect").click(this.logout);
    
	},
    
    logout: function() {
        Trello.deauthorize();
        this.updateLoggedIn();
    },
    
    updateLoggedIn: function() {
        var isLoggedIn = Trello.authorized();
        $("#loggedout").toggle(!isLoggedIn);
        $("#loggedin").toggle(isLoggedIn);        
    },
    
    onAuthorize: function() {
        this.updateLoggedIn();
        $("#output").empty();
        
        Trello.members.get("me", function(member){
            $("#fullName").text(member.fullName);
        });
        
		this.getBoards("members/me/boards");
    },
	
    getCards: function(list) {
        var self = this;
        self._cards = [];
		var cardSet = [];
        // Output a list of all of the cards that the member 
        // is assigned to
        var uri = "/lists/" + list.id + "/cards";
        Trello.get(uri, {"checklists": "all"}, function(cards) {
            
            $.each(cards, function(ix, card) {
                var cardData = {};
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
                                cardData[itemKey] = itemVal;
                            }
                        }
                        break;
                    }
                }
                
                var c = {
                    name: card.name,
                    desc: card.desc,
                    data: cardData
                };
                
                cardSet.push(c);
            });
            
            // Emit event.
            self.trigger(TrelloIO.CARDS_READY, cardSet);
        });
    },
    
    getLists: function(board) {
        var $lists = $("#list-select")
            .empty()
            .append($("<option value='' selected>Select list</option>"));
        var self = this;
        
        $.each(board.lists, function(ix, list) {
            $("<option></option>")
            .attr({value: list.id})
            .text(list.name)
            .appendTo($lists);
        });
        
        $lists.change(function(e) {
            // Get new lists to display when a board is selected.
            $selected = $("option:selected", e.delegateTarget);
            self.getCards(board.lists[$selected.val()]);
        });
    },
    
    getBoards: function(uri) {
        var self = this;
        self._boards = {};
        var $boards = $("#board-select")
            .empty()
            .append($("<option value='' selected>Loading boards...</option>"));
        // Output a list of all of the cards that the member 
        // is assigned to
        Trello.get(uri, {"lists": "all"}, function(boards) {
            $boards.empty()
            .append($("<option value='' selected>Select board</option>"));
            
            $.each(boards, function(ix, board) {
                var listObj = {};
                for (var lcv = 0; lcv < board.lists.length; lcv++) {
                    listObj[board.lists[lcv].id] = board.lists[lcv];
                }
                board.lists = listObj;
                self._boards[board.id] = board;
                $("<option></option>")
                .attr({value: board.id})
                .text(board.name)
                .appendTo($boards);
            });
            
            $boards.change(function(e) {
                // Get new lists to display when a board is selected.
                $selected = $("option:selected", e.delegateTarget);
                self.getLists(self._boards[$selected.val()]);
            });
            
            // Emit event.
            self.trigger(TrelloIO.BOARDS_READY, self._boards);
        });
    }
});

/*
 * Define constants for Event types.
 */
TrelloIO.AUTHORIZED = "authorized";
TrelloIO.BOARDS_READY = "boardsReady";
TrelloIO.CARDS_READY = "cardsReady";