// 5 

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
    ships: [{locations: ['10', '20', '30'], hits: ["", "", ""]},
            {locations: ['43', '44', '45'], hits: ["", "", ""]},
            {locations: ['10', '20', '30'], hits: ["", "", ""]}],
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "x";
                display.displayHit(guess);
                display.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    display.displayMessage("You've sunken my battleship!");
                    this.shipsSunk++;
                }
                return;
            } else {
                display.displayMessage("MISS!")
                display.displayMiss(guess);
            }
        }
    },
    isSunk: function(ship){
        for (let i = 0; i < 3; i++) {
            if (ship.hits[i] !== 'x') {
                return false;
            }
        }
        return true;
    }

}

let brain = {

    processGuess: function(guess) {
        let location = this.processGuess(guess);
        if (location) {
            let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
            if (guess == null || guess.length !== 2) {
                display.displayMessage("Invalid coordinate")
            };
            row = alphabet.indexOf(guess.charAt(0));
            column = guess.charAt(1);
            if (isNaN(row) || isNaN(column)) {
                alert("That is not a valid input");
            } else if (row < 0 || row > gameModel.boardsize || column < 0 || column > gameModel.boardsize) {
                alert("That is not a valid input");
            } else {
                return row + column;
                gameModel.numGuesses++
            }
            return null;
        }
        
    },

    createShip: function() {
        let bow = Math.floor(Math.random() * 5 );
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
        };
    }
};



//let stats = "It took you " + guesses + " shots to sink the ship.\n" + "Accuracy: " + (3/guesses);
//alert(stats);