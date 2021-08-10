class Ship {

    constructor(hull, firepower, accuracy, shields) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        // Shields are set to 0 by default. Taken from Tavaris
        this.shields = shields || 0;
    }

    attack(ship) {
        // Checks to see if the random number is less than or equal to 
        // the accuracy
        if(Math.random() <= this.accuracy) {
            console.log("The attack was successful " + this.firepower);
            ship.hit(this.firepower);
        }
    }

    hit(points) {
        // If the ship has shields, it removes one of them
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
    alert("Maybe next time you will have the courage to face them and defend the Earth....");
    resetGame();
    startGame(true);
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
        // Gives each value a random value for hull, firepower, accuracy
        let hull = randomInt(3, 6);
        let firepower = randomInt(2, 4);
        let accuracy = randomFloat(0.6, 0.8);
        let ship = new Ship(hull, firepower, accuracy, 0);
        enemyShips.push(ship);
    }
}

// Removes the current enemy ship
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
        alert("Please enter a valid option.")
        nextMove();
    }
}

let gameOver = () => {
    // Checks to see if my ship is dead
    console.log("This game should be over.");
    if(myShip.isDead()) {
        alert("The enemy has defeated you!");
        alert("Earth is no longer safe.....");
        alert("Maybe next time you can conquer your enemy.")
        resetGame();
        startGame(true);
    } else if(!myShip.isDead()) {
        alert("You have defended Earth from the enemy!");
        alert("The USS Schwarzenegger has once again prevailed against the opponent.");
        alert("Maybe next time they will send someone stronger......");
        resetGame();
        startGame(true);
    }
}

// Check through this logic again because we want to give a prompt
// to retreat if the enemy ship (that we were previously attacking)
// has been destroyed so that it can be removed from the array
// and the player has an option to attack/retreat
let playRound = () => {
    console.log("Enemies left: " + enemyShips.length);
    // Checking to see whose turn it is
    if(currentTurn == 1) {
        if(!myShip.isDead()) {
            // Checks to see if the enemy ship is not dead
            console.log("Gets to player's turn");
            if (!enemyShips[0].isDead()) {
                let hp = enemyShips[0].hull;
                myShip.attack(enemyShips[0]);
                if (hp == enemyShips[0].hull) {
                    alert("You missed the enemy's ship!");
                } else {
                    alert(`${enemyShips[0].hull > 0 ? `You hit the enemy ship [${hp} HP] for ${myShip.firepower}! The enemy ship has ${enemyShips[0].hull} HPs left.` : `You hit the enemy ship for ${myShip.firepower} and destroyed their ship!`}`);
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
        // The enemy's turn 
    } else if(currentTurn == 2) {
        // Checking to see if the current enemy ship is still alive
        if(!enemyShips[0].isDead()) {
            // Checking to see if myShip am still alive
            if(!myShip.isDead()) {
                // The enemy attacks
                let hp = myShip.hull;
                enemyShips[0].attack(myShip);
                if(hp == myShip.hull) {
                    alert("The enemy missed your ship");
                } else {
                    alert(`${myShip.hull > 0 ? `The enemy hit your ship for ${enemyShips[0].firepower}! You have ${myShip.hull} HPs left.` : `The enemy hit your ship for ${enemyShips[0].firepower}! You have been destroyed!`}`);
                }
                // Changes to player round
                currentTurn = 1;
                playRound();
            } else { 
                gameOver();
            }
        } else {
            // Removes the enemy ship if there are still more ships available
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

let startGame = (prompts) => {
    if(prompts) {
        alert("Welcome to the Space Battle!");
        alert("The enemy is approaching the earth! They are coming to take over.....");
        alert("Here comes the USS Schwarzenegger to intercept! LET'S GO");
    }
    let attack = prompt("Would you like to attack/retreat? ", "attack/retreat");
    if(attack == "attack") {
        createShips();
        playRound();
    } else if(attack == "retreat") {
        retreat();
    } else {
        alert("Please type a valid option");
        startGame(false);
    }
}

startGame(true);