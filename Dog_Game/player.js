import { Sitting, Running, Jumping, Falling, Rolling } from './playerStates.js';


export class Player{
    constructor(game){
        this.game = game;
        this.width =  100;
        this.height = 91.3;
        this.x = 0;
        this.y =  this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.speed =  0;
        this.maxSpeed = 10;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this), new Rolling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.rollingCheck = false;
        this.lives = 5;
    }

    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        // Right, Left Movement
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // Jump, Down Movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //Sprite Animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;    
        }else{
            this.frameTimer += deltaTime;
        }
    }


    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
    }

    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state){
        this.currentState = this.states[state]
        this.currentState.enter();
    }

    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if (enemy.x < this.x  + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
                if (this.rollingCheck == true) {
                    this.game.score++;
                    enemy.offScreenDetection = true;
                } else{
                        enemy.offScreenDetection = true;
                        this.lives--;
                }
            }
        });
    }
}

