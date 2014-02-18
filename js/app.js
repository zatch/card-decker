function App() {
    var pileMgr = new PileManager();
    var uiMgr = new UIManager();
    var trelloIO = new TrelloIO();
    
    uiMgr.bind(UIManager.ADD_PILE, function(type, origin, data) {
        pileMgr.handleEvent(type, origin, data);
    });
    
    trelloIO.bind(TrelloIO.CARDS_READY, function (type, origin, data) {
        uiMgr.handleEvent(type, origin, data);
    });
    
    pileMgr.bind(PileManager.PILE_CREATED, function (type, origin, data) {
        uiMgr.handleEvent(type, origin, data);
    });
}