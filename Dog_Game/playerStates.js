const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
}

class State {
    constructor(state){
        this.state = state;
    }
}
//Running State
export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }

    enter(){
        this.player.maxFrame = 6;
        this.player.frameY = 3;
    }

    handleInput(input){
        if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING);
        }
        else if (input.includes('ArrowDown')) {
            this.player.setState(states.ROLLING)
        }
    }
}

//Sitting State
export class Sitting extends State {
    constructor(player){
        super('SITTING');
        this.player = player;
    }

    enter(){
        this.maxFrame = 4;
        this.player.frameY = 5;
    }

    handleInput(input){
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.player.setState(states.RUNNING);
        } else if (input.includes('ArrowDown')) {
            setTimeout(() => {  this.player.setState(states.RUNNING), this.player.rollingCheck = false; }, 5000);
            this.player.setState(states.ROLLING)
            
        }
    }
}

//Jumping State
export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    }

    enter(){
        this.maxFrame = 6;
        if (this.player.onGround()) this.player.vy -= 35;
        this.player.frameY = 1;
    }

    handleInput(input){
        if (this.player.vy > this.player.weight){
            this.player.setState(states.FALLING);
        }
    }
}

//Falling State
export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }

    enter(){
        this.maxFrame = 6;
        this.player.frameY = 2;
    }

    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(states.RUNNING);
        }
    }
}

export class Rolling extends State{
    constructor(player){
        super('ROLLING');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.maxFrame = 6;
        this.player.frameY = 6;
        this.player.rollingCheck = true;
    }

    handleInput(input){
        this.player.setState(states.ROLLING)
            setTimeout(() => {  this.player.setState(states.RUNNING), this.player.rollingCheck = false; }, 3000);
        if (input.includes('ArrowUp')) {
            if (this.player.onGround()) {
                this.player.vy -= 35;
            }
        }
    }
}