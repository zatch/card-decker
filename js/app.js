function App() {
    
    var deck,
        $deck = $("#deck-container");
    
    var buildDeck = function(cards) {
        deck = new Deck($deck, cards);
        deck.shuffle()
            .print();
    };
    
    var getCards = function(uri) {
        $deck.empty()
             .append($("<p>Loading cards...</p>"));
        
        // Output a list of all of the cards that the member 
        // is assigned to
        Trello.get(uri, {"checklists": "all"}, function(cards) {
            $deck.empty();
            
            var myCards = [];
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
                    myCards.push(c);
                }
            });
            
            buildDeck(myCards);
            
        });
    };
    
    var getLists = function(uri) {
        var $lists = $("#list-select")
            .append($("<option value='' selected>Loading lists...</option>"));
        
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
                getCards("/lists/" + $selected.val() + "/cards");
            });
        });
    };
    
    var getBoards = function(uri) {
        var $boards = $("#board-select")
            .append($("<option value='' selected>Loading boards...</option>"));
        
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
                getLists("/boards/" + $selected.val() + "/lists");
            });
        });
    };
    
    var onAuthorize = function() {
        updateLoggedIn();
        $("#output").empty();
        
        Trello.members.get("me", function(member){
            $("#fullName").text(member.fullName);
            getBoards("members/me/boards");
        });    
    };
    
    var updateLoggedIn = function() {
        var isLoggedIn = Trello.authorized();
        $("#loggedout").toggle(!isLoggedIn);
        $("#loggedin").toggle(isLoggedIn);        
    };
    
    var logout = function() {
        Trello.deauthorize();
        updateLoggedIn();
    };
    
    Trello.authorize({
        interactive:false,
        success: onAuthorize
    });
    
    $("#connectLink")
    .click(function(){
        Trello.authorize({
            type: "popup",
            success: onAuthorize
        });
    });
    
    $("#disconnect").click(logout);
}