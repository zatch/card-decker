function App() {
    
    var decks = [],
        $decksContainer = $("#decks-container");
    
    var buildDeck = function(cards) {
        decks.push(new Deck(cards));
        $decksContainer.append(decks[decks.length-1].$deck);
    };
    
    var trelloIO = new TrelloIO();
    trelloIO.bind(TrelloIO.CARDS_READY, function (type, origin, data) {
        $("#new-deck-btn").unbind("click").click(function() {
            buildDeck(data);
        });
    });
}