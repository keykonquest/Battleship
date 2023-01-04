// 8 

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
    numShips: Math.floor(Math.random() * 3 + 2),
    shipsSunk: 0,
    numGuesses: 0,
    shipLength: Math.floor(Math.random() * 3 + 2),
    ships: [{locations: [], hits: ["", "", ""]},
            {locations: [], hits: ["", "", ""]},
            {locations: [], hits: ["", "", ""]}],
    spawnPoints: function() {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = brain.createShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    }, 
    collision: function(locations) {
        for (let i = 0; i < gameModel.numShips; i++) {
            let ship = this.ships[i];
            for (let x = 0; x < locations.length; x++) {
                if (ship.locations.indexOf(locations[x]) >=0) {
                    return true;
                }
            }
        }
        return false;
    },
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "x";
                display.displayHit(guess);
                display.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    display.displayMessage("You've sunken my\n battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
            
        }
        display.displayMessage("MISS!")
        display.displayMiss(guess);
        return false;
    },
    isSunk: function(ship){
        for (let i = 0; i < gameModel.shipLength; i++) {
            if (ship.hits[i] !== 'x') {
                return false;
            }
        }
        return true;
    }

}

let brain = {

    parseGuess: function(guess) {
        let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
        if (guess == null || guess.length !== 2) {
            display.displayMessage("Invalid input")
        };
        row = alphabet.indexOf(guess.charAt(0));
        column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert("That is not a valid input");
        } else if (row < 0 || row > gameModel.boardsize || column < 0 || column > gameModel.boardsize) {
            alert("That is not a valid input");
        } else {
            gameModel.numGuesses++;
            return row + column;
       }
       return null;
    },

    processGuess: function(guess) {
        let location = this.parseGuess(guess);
        if (location) {
            gameModel.numGuesses++;
            let shot = gameModel.fire(location);
            if (shot && gameModel.shipsSunk === gameModel.numShips) {
                let displayMessageElement = document.getElementById("display-message");
                displayMessageElement.style.fontSize = '1.5rem';
                display.displayMessage("You have sunken all my ships. You win this battle.");
            }
            return shot;
        }
        return false;
    },

    createShip: function() {
        // ship direction: 0 = vertical, 1 = horizontal
        let direction = Math.floor(Math.random() * 2);
        let row;
        let col;
        if (direction === 1) {
            row = Math.floor(Math.random() * gameModel.boardsize);
            col = Math.floor(Math.random() * (gameModel.boardsize - 3) + 1);
        } else {
            col = Math.floor(Math.random() * gameModel.boardsize);
            row = Math.floor(Math.random() * (gameModel.boardsize - 3) + 1);
        }

        let newShipLocations = [];
        for (let i = 0; i < gameModel.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    }
    
};

function fireButtonHandler() {
    let guessInput = document.getElementById('userInput');
    let guess = guessInput.value;
    brain.processGuess(guess);
    //reset form
    guessInput.value = "";
}

function init() {
    let fireButton = document.getElementById('fireButton');
    fireButton.onclick = fireButtonHandler;
    let guessInput = document.getElementById('userInput');
    guessInput.addEventListener('keydown', (event) => {
        if (event.code === 13) {
            fireButton.click();
        }
    });
    gameModel.spawnPoints();
}

let click2start = document.getElementById('fireButton');
click2start.onclick = init;
//let stats = "It took you " + guesses + " shots to sink the ship.\n" + "Accuracy: " + (3/guesses);
//alert(stats);