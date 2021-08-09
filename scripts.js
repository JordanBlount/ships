class Ship {

    constructor(hull, firepower, accuracy, shields) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.shields = shields;
    }

    attack(ship) {
        // console.log(ship);
        // console.log(`Opposing ship hull: ` + ship.hull)
        // Checks to see if the random number is less than or equal to 
        // the accuracy
        if(Math.random() <= this.accuracy) {
            console.log("The attack was successful " + this.firepower);
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

    // This is not how I would ideally want to do this
    // It would be better to pass in an identifier to 
    // specifically say this is a Mother Ship and not based
    // on its number of shields because technically my ship
    // could be a mother ship if I checked this
    isMotherShip() {
        return this.shields > 0;
    }
}

// 1 is my turn
// 2 is enemies turn
let currentTurn = 1;

let myShip = null;
let enemyShips = [];

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
}

// TODO: Clean up this code
// TODO: Decide if I want the first value to be removed or the last.
//       This will change up my code a little bit.
// This could probably be done better by slicing or something to remove it.
let removeShip = () => {
    enemyShips.shift();
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

let gameOver = () => {
    // Checks to see if my ship is dead
    console.log("This game should be over.");
    if(myShip.isDead()) {
        alert("sThe enemy has destroyed you!");
        resetGame();
        startGame();
    } else if(!myShip.isDead()) {
        alert("You have defended Earth from the enemy!");
        resetGame();
        startGame();
    }
}

// Check through this logic again because we want to give a prompt
// to retreat if the enemy ship (that we were previously attacking)
// has been destroyed so that it can be removed from the array
// and the player has an option to attack/retreat
let playRound = () => {
    // Checking to see whose turn it is
    console.log("Enemies left: " + enemyShips.length);
    if(currentTurn == 1) {
        if(!myShip.isDead()) {
            // Checks to see if the enemies ship is not dead
            console.log("Gets to player's turn");
            if (!enemyShips[0].isDead()) {
                let hp = enemyShips[0].hull;
                myShip.attack(enemyShips[0]);
                if (hp == enemyShips[0].hull) {
                    alert("You missed the enemies ship!");
                } else {
                    alert(`${enemyShips[0].hull > 0 ? `You hit the enemy ship! The Enemy's ship has ${enemyShips[0].hull} HPs left.` : `You hit the enemy ship! The Enemy's ship was destroyed!`}`);
                }
                currentTurn = 2;
                playRound();
            } else {
                if(enemyShips.length > 1) {
                    console.log("A ship should be removed"); 
                    currentTurn = 1;
                    removeShip();
                    nextMove();
                } else {
                    gameOver();
                }
            }
        } else {
            gameOver();
        }
    } else if(currentTurn == 2) {
        if(!enemyShips[0].isDead()) {
            if(!myShip.isDead()) {
                let hp = myShip.hull;
                enemyShips[0].attack(myShip);
                if(hp == myShip.hull) {
                    alert("The enemy missed your ship");
                } else {
                    if(myShip.hull >= 0) {
                        alert("The enemy hit your ship. You have " + myShip.hull + " HP left.");
                    }
                }
                currentTurn = 1;
                playRound();
            } else { 
                gameOver();
            }
        } else {
            if(enemyShips.length > 1) {
                console.log("A ship should be removed"); 
                removeShip();
                currentTurn = 1;
                nextMove();
            } else {
                gameOver();
            }
        }
    }
}

let startGame = () => {
    alert("Welcome to the Space Battle!");
    let attack = prompt("Would you like to attack/retreat? ", "attack/retreat");
    if(attack == "attack") {
        createShips();
        playRound();
    } else if(attack == "retreat") {
        retreat();
    }
}

startGame();