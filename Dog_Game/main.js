import {Player} from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js'
import { UI } from './ui.js'

window.addEventListener('load', function(){

    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    class Game{
        constructor(width,height){
            this.score = 0;
            this.ui = new UI(this);
            this.width = width;
            this.height = height;
            this.groundMargin = 70;
            this.speed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.lose = false;
            this.rollinCountDown = 0;
        }


        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            //handleEnemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            }else {
                this.enemyTimer += deltaTime;
                this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
                    if (enemy.offScreenDetection)this.enemies.splice(this.enemies.indexOf(enemy), 1)
                })
            }
           if (this.player.lives < 1) {
                setTimeout(() => {  location.reload(); }, 1000);
            }           
        }

        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.ui.draw(context);
        }

        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            if (this.offScreen) this.enemies.splice(this.enemy.indexOf(enemy), 1)
        }
    }



    const game = new Game(canvas.width, canvas.height);
    console.log('game');
    let lastTime = 0;


    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
});