class Ship {

    constructor(hull, firepower, accuracy, shields) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.shields = shields;
    }

    attack(ship) {
        // Checks to see if the random number is less than or equal to 
        // the accuracy
        if(Math.random() <= this.accuracy) {
            ship.hit(this.firepower);
        }
    }

    hit(points) {
        // If the ship has sheilds, removes one of them
        if(this.shields > 0) {
            this.shields -= 1;
        } else {
            // If the ship has no shields, it removes HP
            this.hull -= points;
        }
    }

    // Checks to see if the ship has been destroyed
    isDead() {
        return ship.hull <= 0;
    }
}

// 1 is my turn
// 2 is enemies turn
let currentTurn = 1;

let myShip = new Ship(20, 5, 0.7, 0);
let enemyShips = [];


// TODO: Check through this logic again because we want to give a prompt
//       to retreat if the enemy ship (that we were previously attacking)
//       has been destroyed so that it can be removed from the array
//       and the player has an option to attack/retreat
let playRound = () => {
    // Checking to see whose turn it is
    if(currentTurn == 1) {
        // Checks to see if the enemies ship is not dead and there are still ships left.
        if(!enemyShips[0].isDead() && enemyShips.length > 0) {
            myShip.attack(enemyShips[0]);
            currentTurn = 2;
        } else {
            gameOver();
        }
    } else {
        if(!myShip.isDead()) {
            enemyShips[0].attack(myShip);
            currentTurn = 2;
        } else { 
            gameOver();
        }
    }
}

let gameOver = () => {
    // Checks to see if my ship is dead
    if(myShip.isDead() && enemyShips.length > 0) {
        alert("The enemy has destroyed you!");
        resetGame();
        startGame();
    } else if(!myShip.isDead() && enemyShips.length <= 0) {
        alert("You haved defended Earth from the enemy!");
        resetGame();
        startGame();
    }
}

let startGame = () => {
    let attack = prompt("Would you like to attack/retreat? ", "attack/retreat");
    if(attack == "attack") {
        playRound();
    } else if(attack == "retreat") {
        
    }
}

let resetGame = () => {
    
}

let createShips = () => {
    myShip = new Ship(20, 5, 0.7, 0);
    for(i = 0; i < 6; i++) {
        // Add random values in here using Math.random();
        let ship = new Ship(0, 0, 0, 0, 0);
        enemyShips.push(ship);
    }
}

// TODO: Clean up this code
// This could probably be done better by slicing or something to remove it.
let removeShip = (ship) => {
    enemyShips.shift();
}