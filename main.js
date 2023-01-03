// 4 

let shipSunk = false;

// Provides the user visual feedback
let display = {
    displayMessage: function(msg) {
        let messageArea = document.querySelector('.message-area');
        messageArea.innerHTML = msg;
    }, 
    displayHit: function(location) {
        let hitMarker = document.getElementById(location);
        hitMarker.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        let missMarker = document.getElementById(location);
        missMarker.setAttribute("class", "miss");
    },
};

// Manages the data for game
let gameModel = {
    boardsize: 7,
    //numShips: Math.floor(Math.random() * 4),
    numShips: 2,
    shipsSunk: 0,
    numGuesses: 0,
    ships: [{locations: ['10', '20', '30'], hits: ["", "", ""] },
            {locations: ['43', '44', '45'], hits: ["", "", ""] }],
    fire: function(guess) {
        for (i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            if (guess in ship["locations"]) {
                display.displayHit(guess);
            } 
        }
    }

}

let brain = {
    createShip: function() {
        let bow = Math.floor(Math.random() *  );
    },
    addSegment: function(head) {
        let direction = Math.random();
        if (direction <= 0.5) {
            this.segment = head + 1;
            if (this.segment > gameModel.boardsize) {
                this.segment = head - 1;
            }
        } else {
            this.segment = head + 10;
            if
        }
    }
};


let stats = "It took you " + guesses + " shots to sink the ship.\n" + "Accuracy: " + (3/guesses);
alert(stats);