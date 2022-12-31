
import Phaser from 'phaser';

class Preload extends Phaser.Scene{
    constructor(){
        super("Preload");
    }

    preload () {
        this.load.image('sky', 'assets/background.png');
        this.load.image('player', 'assets/monkey_small.png');
        this.load.image('banana', 'assets/bananas.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('back', 'assets/back.png');
        this.load.image('menu', 'assets/menu_background.png');
    }

    create () {
        this.scene.start("Menu");
    }
}

export default Preload;