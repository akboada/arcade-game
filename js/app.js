
var gameWidth = 400;
var gameHeight = 400;

var scoreCounter = 0;
var livesCounter = 3;

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 50;
    this.yPos = [50, 130, 225];
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
    this.speed = Math.floor(Math.random() * (300 - 200)) + 200;
}
    

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    this.height = 50;
    this.width = 50;

    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        player.reset();
        livesCounter--;
    }

    if (this.x > gameWidth + 100){
        this.reset();
    }

    
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.reset = function() {
    this.x = 10;
    this.y = this.yPos[Math.round(Math.random() * this.yPos.length)];
}    

//Player

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.speed = 25;
}


Player.prototype.update = function() {
    this.y = this.y;
    
    this.x = this.x;

    this.height = 50;
    this.width = 50;

    if (this.y <= 3){
        this.reset();
        scoreCounter++;
        console.log(scoreCounter);
    }
}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.font = "25px Futura";
    ctx.textAlign = "right";
    ctx.fillStyle= "white";

    //Score Counter Text
    ctx.fillText("Score:", 85, 85);
    ctx.fillText(scoreCounter, 60, 115);

    //Lives Counter Text
    ctx.fillText("Lives:", 485, 85);
    ctx.fillText(livesCounter, 460, 115);

    if (livesCounter < 1){
        alert("Game Over");
        livesCounter = 3;
        scoreCounter = 0;

    }
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
}



var allEnemies = [enemy = new Enemy(), enemy2 = new Enemy(), enemy3 = new Enemy()];

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


