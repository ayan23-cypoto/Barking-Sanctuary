export class deathParticle{
    constructor(game){
        this.game = game;
        this.quadraticX = 0;
        this.quadraticY = 0;
    }

    update(){
    }

    draw(context){
        //1
        this.quadraticY++;
        this.quadraticX--;
        context.lineWidth = 20;
        context.strokeStyle = "#FFFF00"
        context.beginPath();
        context.moveTo(this.game.particleX, this.game.particleY);
        context.lineTo(this.quadraticX, this.quadraticY)
        context.stroke();
        //2
        context.lineWidth = 20;
        context.strokeStyle = "#FFFF00"
        context.beginPath();
        context.moveTo(this.game.particleX, this.game.particleY);
        context.lineTo(this.quadraticY, this.quadraticX);
        context.stroke();
    }
}

export class newParticle{
    constructor(game){
        this.game = game;
        this.speed = 35;
        this.colors = ['#1eff00', '#ccff00', '#f6ff00', '#ff8800', '#ff0000'];
        this.color = Math.floor(Math.random() * this.colors)
        this.size = Math.floor(Math.random() * 8) * 10
        this.pos = Math.floor(Math.random() * 200) * 10
        this.pos2 = Math.floor(Math.random() * 80) * 10
        this.opacity = 1;
    }
    
    draw(context){
        context.beginPath();
        context.globalAlpha = this.opacity;

    }
}
