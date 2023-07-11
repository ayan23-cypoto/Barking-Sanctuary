class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    update(){
        if (this.x < -this.width) this.x = 0;
        else this.x -= 4 * this.speedModifier;
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

export class Background {
    constructor(game){
        this.game = game;
        this.width = this.game.width + 1500;
        this.height = this.game.height;
        this.layer5image = Layer5;
        this.layer4image = Layer4;
        this.layer3image = Layer3;
        this.layer2image = Layer2;
        this.layer1image = Layer1;
        this.layer1 = new Layer(this.image, this.width, this.height, 0, this.layer5image);
        this.layer2 = new Layer(this.image, this.width, this.height, 0.2, this.layer4image);
        this.layer3 = new Layer(this.image, this.width, this.height, 0.4, this.layer3image);
        this.layer4 = new Layer(this.image, this.width, this.height, 0.8, this.layer2image);
        this.layer5 = new Layer(this.image, this.width, this.height, 2, this.layer1image);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
    }
    
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    }

    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}