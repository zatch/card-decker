function App() {
    
    var decks = [],
        $decksContainer = $("#decks-container");
    
    var addDeck = function() {
        decks.push(new Deck());
        $decksContainer.append(decks[decks.length-1].$deck);
    };
    
    var start = function() {
        addDeck();
        $("#new-deck-btn").click(function() {
            addDeck();
        });
    };
    
    var onAuthorize = function() {
        updateLoggedIn();
        $("#output").empty();
        
        Trello.members.get("me", function(member){
            $("#fullName").text(member.fullName);
            start();
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