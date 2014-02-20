function App() {
    var pileMgr = new PileManager();
    var uiMgr = new UIManager();
    var trelloIO = new TrelloIO();
    
    uiMgr.bind(UIManager.ADD_PILE, pileMgr.handleEvent);
    
    trelloIO.bind(TrelloIO.CARDS_READY, uiMgr.handleEvent);
    
    pileMgr.bind(PileManager.PILE_CREATED, uiMgr.handleEvent);
}