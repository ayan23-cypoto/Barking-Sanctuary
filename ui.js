export class UI{
    constructor(game){
        this.game = game;
        this.player = this.game.player;
        this.fontSize = 30;
        this.fontFamily = 'Anton';
    }

    draw(context){
        //Player Score
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = 'black';

        context.fillText('Score: ' + this.game.score, 20, 50);

        //Player Lives
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = 'black';

        context.fillText('Lives: ' + this.game.player.lives, 20, 80);

        //Lose
        if (this.game.player.lives < 1) {
            const Insults = ['YOU LOST NOOB', 'CANT YOU PRESS THE BUTTONS FASTER', 'GO BACK TO YOUR DUMPSTER',
             'A FEW BOTS KILLED YOU', 'SOME PEOPLE JUST CANT MAKE IT'];
             const Afan = Insults[Math.floor(Math.random() * Insults.length)];
            context.font = 30 + 'px ' + this.fontFamily;
            context.textAlign = 'center';
            context.fillStyle = 'black';

            context.fillText(Afan, 240, 140);
        }
    }
}