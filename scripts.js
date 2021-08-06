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
        return this.hull <= 0;
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
    if(currentTurn == 1 && !myShip.isDead()) {
        // Checks to see if the enemies ship is not dead
        if(!enemyShips[0].isDead()) {  
            let hp = enemyShips[0].hull;
            myShip.attack(enemyShips[0]);
            if(hp == enemyShips[0]) {
                alert("You missed this enemies ship!");
            }
            currentTurn = 2;
            playRound();
        } else {
            // Checks to see if the enemy still has ships + this 
            // could check if the mother ship is up next
            if(enemyShips.length > 0) {
                removeShip();
                nextMove();
            } else {
                gameOver();
            }
        }
    } else {
        if(!myShip.isDead()) {
            let hp = myShip.hull;
            enemyShips[0].attack(myShip);
            if(hp == myShip.hull) {
                alert("The enemy missed your ship");
            }
            currentTurn = 2;
            playRound();
        } else { 
            gameOver();
        }
    }
}

let nextMove = () => {
    let value = `[Current Health: ${myShip.hull}][Target Health: ${enemyShips[0].hull}][Enemies Left: ${enemyShips.length}]`;
    let attack = prompt(value, "attack/retreat");
    attack.toLowerCase();
    if(attack === "attack") {
        playRound();
    } else if(attack === "retreat") {
        retreat();
    } else {
        // Should only ever happen if someone puts a random value
        nextMove();
    }
}

startGame();

let startGame = () => {
    let attack = prompt("Would you like to attack/retreat? ", "attack/retreat");
    if(attack == "attack") {
        createShips();
        playRound();
    } else if(attack == "retreat") {
        retreat();
    }
}

let gameOver = () => {
    // Checks to see if my ship is dead
    if(myShip.isDead() && enemyShips.length > 0) {
        alert("The enemy has destroyed you!");
        resetGame();
        startGame();
    } else if(!myShip.isDead() && enemyShips.length <= 0) {
        alert("You have defended Earth from the enemy!");
        resetGame();
        startGame();
    }
}

let resetGame = () => {
    currentTurn = 1;
    enemyShips = [];
    myShip = null;
}

let retreat = () => {
    alert("You have chosen to retreat from the battle!");
    resetGame();
    startGame();
}

let randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;   
}

let randomFloat = (min, max) => { 
    return Math.random() * (max - min) + min;
}

let createShips = () => {
    myShip = new Ship(20, 5, 0.7, 0);
    for(i = 0; i < 6; i++) {
        // Creates 6 enemy ships
        let hull = randomInt(3, 6);
        let firepower = randomInt(2, 4);
        let accuracy = randomFloat(0.6, 0.8);
        let ship = new Ship(hull, firepower, accuracy, 0);
        enemyShips.push(ship);
    }
    //console.log(`[Current Health: ${myShip.hull}][Target Health: ${enemyShips[0].hull}][Enemies Left: ${enemyShips.length}]`);
}

// TODO: Clean up this code
// TODO: Decide if I want the first value to be removed or the last.
//       This will change up my code a little bit.
// This could probably be done better by slicing or something to remove it.
let removeShip = (ship) => {
    enemyShips.shift();
}