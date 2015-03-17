

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y; 
    
    this.velX = 100;
    this.velY = 100;
    this.sprite = 'images/enemy-bug.png';
}
    

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.x * dt;

    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 200;
    this.y = 400;
    this.speed = 5; 
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {

    if (37 in keysDown) { //left
        this.x -= this.speed * dt; 
    }
    if (38 in keysDown) { //up
        this.y -= this.speed * dt;
    }
    if (39 in keysDown) { //right
        this.x += this.speed * dt;
    }
    if (40 in keysDown) { //down
        this.y += this.speed * dt;
    }
}

var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy = new Enemy(50,50);
var enemy2 = new Enemy(130,130);
var enemy3 = new Enemy(100,225);

var allEnemies = [enemy, enemy2, enemy3];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

