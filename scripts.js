class Ship {

    constructor(hull, firepower, accuracy, shields) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.shields = shields;
    }

    attack(ship) {
        if(this.accuracy > ship.accuracy) {
            if(ship.shields > 0) {
                ship.shields -= 1;
            } else {
                ship.hull - this.firepower;
            }
        }
    }

    isDead() {
        return ship.hull <= 0;
    }
}

let myShip = new Ship(20, 5, 0.7, 0);

let enemyShips = [];

let currentTurn = 1;



let playRound = () => {
    // Checking to see whose turn it is
    if(currentTurn == 1) {
        myShip.attack(enemyShips[0]);
        // Checks to see if the enemies ship is not dead and there are still ships left.
        if(!enemyShips[0].isDead() && enemyShips.length > 0) {
            currentTurn = 2;
        } else {
            gameOver();
        }
    } else {
        enemyShips[0].attack(myShip);
        if(myShip.isDead()) {
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
