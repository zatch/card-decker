function App() {
    var pileMgr = new PileManager();
    var uiMgr = new UIManager();
    var trelloIO = new TrelloIO();
    
    uiMgr.bind(UIManager.ADD_PILE, $.proxy(pileMgr.handleEvent, pileMgr));
    
    trelloIO.bind(TrelloIO.CARDS_READY, $.proxy(uiMgr.handleEvent, uiMgr));
    
    pileMgr.bind(PileManager.PILE_CREATED, $.proxy(uiMgr.handleEvent, uiMgr));
}