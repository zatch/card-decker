function App() {
    var deckMgr = new DeckManager();
    var uiMgr = new UIManager();
    var trelloIO = new TrelloIO();
    
    uiMgr.bind(UIManager.ADD_DECK, function(type, origin, data) {
        deckMgr.handleEvent(type, origin, data);
    });
    uiMgr.bind(UIManager.DECK_CLICKED, function(type, origin, data) {
        deckMgr.handleEvent(type, origin, data);
    });
    
    trelloIO.bind(TrelloIO.CARDS_READY, function (type, origin, data) {
        uiMgr.handleEvent(type, origin, data);
    });
    
    deckMgr.bind(DeckManager.DECK_CREATED, function (type, origin, data) {
        uiMgr.handleEvent(type, origin, data);
    });
}