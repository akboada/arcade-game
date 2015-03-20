
var gameWidth = 400;
var gameHeight = 400;

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 50;
    this.yPos = [50, 130, 225];
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
    this.speed = Math.floor(Math.random() * (4 - 2)) + 2;
}
    

Enemy.prototype.update = function(dt) {
    this.x += this.x * this.speed * dt;

    if (this.x == player.x + player.width && this.y == player.y + player.height){
        player.reset();
    }

    if (this.x > gameWidth + 100){
        this.reset();
    }

    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.reset = function() {
    this.x = 10;
    this.y = this.yPos[Math.round(Math.random() * this.yPos.length)];
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



var allEnemies = [enemy = new Enemy(), enemy2 = new Enemy(), new Enemy()];

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


