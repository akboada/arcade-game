

// Enemies our player must avoid


 var gameWidth = 400;
 var gameHeight = 400;

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
    this.speed = Math.floor(Math.random() * (3 - 1)) + 1;
}
    

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.x * this.speed * dt;

    if (this.x > gameWidth + 100){
        this.reset();
    }

    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.reset = function() {
    this.x = Math.floor(Math.random() * (50 - 20)) + 20;
}    

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.speed = 50; 
}


Player.prototype.update = function() {
    this.y = this.y;
    
    this.x = this.x;

    if (this.y <= 3){
        this.reset();
    }
}


// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
}

Player.prototype.handleInput = function(key) {

    switch (key) {
        case "up":
            this.y = this.y - this.speed;
            break;
        case "down":
            if (this.y < gameHeight) {
                this.y = this.y + this.speed;
            }
            break;
        case "left":
            if (this.x > 0){
                this.x = this.x - this.speed;
            }
            break;
        case "right":
            if (this.x < gameWidth){
            this.x = this.x + this.speed;    
            }
            break;
        default:
            console.log("Please select an arrow key");                          
    }

   /*

    if (key == "up"){
        this.y = this.y - this.speed;
    }
    
    if (this.y < gameHeight) {
        if (key == "down") { 
         
        }
    }

    if (key == "left") {
        if (this.x > 0){
         this.x = this.x - this.speed;
        }
    }    
        
    if (key == "right") {
        if (this.x < gameWidth) {  
        this.x = this.x + this.speed;
        }
    }  
    */  
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy = new Enemy(50,50);
var enemy2 = new Enemy(130,130);
var enemy3 = new Enemy(100,225);
var enemy4 = new Enemy(350,50);
var enemy5 = new Enemy(400,130);
var enemy6 = new Enemy(300,225);

var allEnemies = [enemy, enemy2, enemy3, enemy4];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


