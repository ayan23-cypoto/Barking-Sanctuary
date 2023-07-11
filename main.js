import {Player} from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js'
import { UI } from './ui.js'
import { deathParticle } from './particle.js'
import { newParticle } from './particle.js'
import { climbingPlatform, enemyAmmo } from './platforms.js'
import { Multiplayer } from "./multiplayer.js";


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
            this.newParticle = new newParticle(this);
            this.platform = new climbingPlatform(this);
            this.mp = new Multiplayer(this);
            this.enemyAmmo = new enemyAmmo(this);
            this.enemies = [];
            this.platforms = [];
            this.particles = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.lose = false;
            this.rollinCountDown = 0;
            this.particleX = 0;
            this.particleY = 0;
            this.sas = false;
            this.zenjuned = true;
            this.platformBoolean = false;
            this.playerS = [];
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
           if (this.player.lives < 1 && this.zenjuned) {
                setTimeout(() => {  location.reload(); }, 1000);
                this.zenjuned = false;
            }
        }

        draw(context){
            this.enemyAmmo.draw(context);
            this.newParticle.draw(context);
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.platforms.forEach(pf =>  {
                pf.draw(context);
            })
            this.playerS.forEach(plr => {
                plr.draw(context);
                plr.x = 200;
            })

            if (this.sas == true){
                this.particles.push(new deathParticle(this));
                this.particles.forEach(deathParticle => {
                    deathParticle.draw(context);
                });
                setTimeout(() => {
                    this.sas = false;
                }, 5000);
            }

            if (this.sas == false) {
                setTimeout(() => {
                    this.particles.pop(deathParticle);
                }, 5000);
            }
            this.ui.draw(context);
        }

        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5){ 
                this.enemies.push(new GroundEnemy(this))
            }
            else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            if (this.offScreen) this.enemies.splice(this.enemies.indexOf(enemy), 1)
            //Platforms Sorry for adding here future ayan :D
            setTimeout(() => {
                this.platforms.length = 0;
            }, 1000);

            if  (typeof platforms !== 'undefined' && this.platforms.length == 0) {
                console.log("l")
            }
            else{
                this.platforms.push(new climbingPlatform(this))
                this.groundMargin = 70;
            }
            if (this.mp.addPlayer == true) {
                this.playerS.push(new Player(this));
            }
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
