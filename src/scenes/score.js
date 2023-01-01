import Phaser from 'phaser';

class Score extends Phaser.Scene{
    constructor(){
        super("Score");
    }

    create () {
        this.createBG();
        this.createScore();
        this.createBack();
    }

    createBG () {
        this.add.image(400, 300, "sky");
    }
    
    createScore () {
        let score = localStorage.getItem("bestScore");
        this.add.text(200, 300, `Najlepsze punkty: ${score || 0}`, {fontSize: "32px", fill: "#fff"});
    }

    createBack () {
        const backButton = this.add.image(790, 590, "back")
            .setInteractive()
            .setScale(3)
            .setAlpha(0.5)
            .setOrigin(1);

      

        backButton.on('pointerover', () => {
            backButton.setAlpha(1);
            console.log("OVER");
        })

        backButton.on('pointerout', () => {
            backButton.setAlpha(0.5);
            console.log("OUT");
        })

        backButton.on('pointerup', () => {
            this.scene.start("Menu");
        })
    }
}

export default Score;