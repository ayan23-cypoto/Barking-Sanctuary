class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 60;
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0;
        this.offScreenDetection = false;
    }

    update(deltaTime){
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else{
            this.frameTimer += deltaTime;
        }

    //Check if off screen
     if (this.x + this.width < 0) this.offScreenDetection = true;
    }


    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);

        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = 1500;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 3;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('EnemyFly')
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle)
    }
}

export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('EnemyGround');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }

    update(deltaTime){
        super.update(deltaTime);
    }
}

export class ClimbingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = document.getElementById('EnemyHang');
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
    }

    update(deltaTime){
        super.update(deltaTime);
        if (this.x > this.game.height - this.height - this.game.groundMargin) this.speedX *= 1
        if (this.x < -this.height) this.offScreenDetection = true;
        
    }

    draw(context){
        super.draw(context)
        context.strokeStyle = "#fff"
        context.lineWidth = 6;
        context.beginPath();
        context.moveTo(this.x + this.width / 2,0);
        context.lineTo(this.x + this.width / 2, this.y + 50);
        context.stroke();
    }
}

