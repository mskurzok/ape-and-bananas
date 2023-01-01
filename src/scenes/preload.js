
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

        this.preloadMonkey();
    }

    create () {
        this.scene.start("Menu");
    }

    preloadMonkey () {
        this.load.image('monkey-1', 'assets/monkey_anims/monkey.png')
        for(var i = 2; i < 8; i++){
            this.load.image(`monkey-${i}`, `assets/monkey_anims/monkey-walk${i}.png`);
        }
    }
}

export default Preload;