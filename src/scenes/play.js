
import Phaser from 'phaser';

class Play extends Phaser.Scene{
    constructor(){
        super("Play");
        this.bananaTrees = [{x: 75, y: 200}, {x: 475, y: 275}, {x: 775, y: 200}];
        this.score = 0;
        this.misses = 0;
        this.health = 2;
    }

    create () {
        this.createBG();
        this.createPlayer();
        this.createBanana();
        this.createScore();
        this.createHealth();
        this.createRestart();
    }

    update () {
        this.playerHandling();
        this.bananaUpdate();
    }

    playerHandling () {
        const { left, right} = this.player.cursors;      

        if(left.isDown){
            this.player.setVelocityX(-this.player.speed);
        }

        else if(right.isDown) {
            this.player.setVelocityX(this.player.speed);
        }

        else {
            this.player.setVelocityX(0);
        }
    }

    bananaUpdate () {
        if(this.banana.y > 600){
            this.misses++;
            this.decreaseHealth();
            this.banana.destroy();
            if(this.misses == 3){
                this.createGameOver();
                this.physics.pause();
            }
            this.createBanana();
        }
    }
    
    createBG () {
        this.add.image(400, 300, 'sky');
    }

    createPlayer () {
        //new Player(this, 400, 300, "player");
        this.player = this.physics.add.sprite(400, 500, "monkey-1");
        this.player.maxSize = 0.75;
        this.player.size = this.player.maxSize;
        this.player.setScale(this.player.size);
        this.player.setSize(54, 185);
        this.player.maxSpeed = 600;
        this.player.speed = this.player.maxSpeed;
        this.player.cursors = this.player.scene.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);
    }

    placeBanana () {
        let bananaTree = this.bananaTrees[Phaser.Math.Between(0, 2)];
        let banana = this.physics.add.sprite(bananaTree.x, bananaTree.y, "banana")
        .setScale(0.5)
        .setGravityY(100);
        return banana;
    }

    createBanana () {
        this.banana = this.placeBanana();
        const overlap = this.physics.add.overlap(this.player, this.banana, () => {
            overlap.active = false;
            this.banana.destroy();
            this.score++;
            this.scoreText.setText(`Punkty: ${this.score}`);
            this.createBanana();
            this.player.speed -= 10;
            this.player.size += 0.01;
            this.player.setScale(this.player.size);
        })
    }

    createScore () {
        const bestScore = localStorage.getItem('bestScore');
        this.scoreText = this.add.text(10, 10, "Punkty: 0", {fontSize: "32px", fill: "#000"}).setOrigin(0);
        this.bestScoreSprite = this.add.text(10, 52, `Najlepsze punkty: ${bestScore || 0}`, {fontSize: "18px", fill: "#000"});
    }

    createGameOver () {
        let gameOver = this.add.text(250, 200, "PRZEGRAŁEŚ", {fontSize: "64px", fill: "#000"});
        gameOver.setDepth(100);
        this.player.setTint(0xff0000);
        this.player.setAlpha(0.5);
        this.saveBestScore();
    }

    createHealth () {
        this.hearths = [];
        for(var i = 20; i < 77; i += 27){
            let heart = this.physics.add.sprite(i, 100, "heart").setScale(0.1);
            this.hearths.push(heart);
        }
    }

    decreaseHealth () {
        this.hearths[this.health].destroy();
        this.health--;
    }

    createRestart() {
        const restartButton = this.add.image(790, 590, "back")
            .setInteractive()
            .setScale(3)
            .setAlpha(0.5)
            .setOrigin(1);

      

        restartButton.on('pointerover', () => {
            restartButton.setAlpha(1);
            console.log("OVER");
        })

        restartButton.on('pointerout', () => {
            restartButton.setAlpha(0.5);
            console.log("OUT");
        })

        restartButton.on('pointerup', () => {
            this.saveBestScore();
            this.scene.restart();
            this.scene.start("Menu");
            this.score = 0;
            this.misses = 0;
            this.health = 2;
        })
    }

    saveBestScore() {
        const bestScoreText = localStorage.getItem("bestScore");
        const bestScore = bestScoreText && parseInt(bestScoreText, 10);

        if(!bestScore || this.score > bestScore){
            localStorage.setItem("bestScore", this.score)
        }
    }
}

export default Play;