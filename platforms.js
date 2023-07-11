export class climbingPlatform {

    constructor(game){
        this.game = game;
        this.width = Math.floor(Math.random() * 100)
        this.height = Math.floor(Math.random() * 600)
        this.y = Math.floor(Math.random() * 700)
        this.x = Math.floor(Math.random() * 900)
        this.deletePlatform = false;
        this.game.platformBoolean = false;
    }

    update(){
        if (this.x < -this.height){ 
            this.deletePlatform = true;
        }
    }

    draw(context){
        context.beginPath();
        this.poop = context.rect(this.x--, this.y + 100, this.height, this.width);
        context.fillStyle = "#ccff00";
        context.fill();
    }
}

export class enemyAmmo {

    constructor(game){
        this.game = game;
        this.width = Math.floor(Math.random() * 100)
        this.height = Math.floor(Math.random() * 600)
        this.x = 0;
        this.y = 0;
        this.deletePlatform = false;
        this.game.platformBoolean = false;
    }

    update(){
        this.game.enemies.forEach(enemy => {
            this.x = enemy.x
            this.y = enemy.y
            console.log("Spawned")
        });
        this.x++;
    }

    draw(context){
        context.beginPath();
        this.poop = context.rect(this.x--, this.y + 100, this.height, this.width);
        context.fillStyle = "#ccff00";
        context.fill();
    }
}