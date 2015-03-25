
var gameWidth = 400;
var gameHeight = 400;

//sets score and lives
var scoreCounter = 0;
var livesCounter = 3;

//Enemy

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.yPos = [50, 130, 225]; 
    this.height = 50;
    this.width = 50;
    this.speed = Math.floor(Math.random() * (300 - 200)) + 200;
}
    
Enemy.prototype.update = function(dt) {
//advances enemy
    this.x += this.speed * dt;

//detects collision with player
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        player.reset();
        livesCounter--;
    }

//respawns enemies after passing the edge of the canvas
    if (this.x > gameWidth + 100){
        this.reset();
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = this.yPos[Math.round(Math.random() * this.yPos.length)];
}    

//Player

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.height = 50;
    this.width = 50;
    this.speed = 25;
}

Player.prototype.update = function() {
//resets player once water is reached
   if (this.y <= 3){
        this.reset();
        scoreCounter++;
    }

//Game Over Message
    if (livesCounter < 1){
        alert('Game Over');
        livesCounter = 3;
        scoreCounter = 0;
    }
}

//renders player sprite and scorekeeping/lives text

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.font = '25px Lato';
    ctx.textAlign = 'right';
    ctx.fillStyle= 'white';

    //Score Counter Text
    ctx.fillText('Score:', 85, 85);
    ctx.fillText(scoreCounter, 60, 115);

    //Lives Counter Text
    ctx.fillText('Lives:', 485, 85);
    ctx.fillText(livesCounter, 460, 115);
}

//resets player to initial position

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
}

//handles user key input

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.y = this.y - this.speed;
            break;
        case 'down':
            if (this.y < gameHeight) {
                this.y = this.y + this.speed;
            }
            break;
        case 'left':
            if (this.x > 0){
                this.x = this.x - this.speed;
            }
            break;
        case 'right':
            if (this.x < gameWidth){
            this.x = this.x + this.speed;    
            }
            break;
        default:
            console.log('Please select an arrow key')                          
    }
}

//instatiates Enemies and Player

var allEnemies = [
    enemy = new Enemy(), 
    enemy2 = new Enemy(), 
    enemy3 = new Enemy()
];

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});