
import Phaser from 'phaser';

class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
        this.bananaTrees = [{x: 75, y: 200}, {x: 475, y: 275}, {x: 775, y: 200}];
        this.score = 0;
        this.misses = 0;
        this.health = 2;

        this.fontSize = 32;
        this.lineHeight = 42;
        this.fontOptions = {fontSize: `${this.fontSize}px`, fill: "#fff"};

        this.menu = [
            {scene: "Play", text: "Graj"},
            {scene: "Score", text: "Punkty"},
            {scene: null, text: "Wyjdź"}
        ]
    }

    create () {
        this.createBG();
        this.createMenu(this.menu, this.setupMenuEvents.bind(this))
    }

    createBG () {
        this.add.image(400, 300, 'menu');
    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuPositionY = 0;

        menu.forEach(menuItem => {
            const menuPosition = [400, 300 + lastMenuPositionY];
            menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1);
            lastMenuPositionY += this.lineHeight;

            setupMenuEvents(menuItem);
        })
    }

    setupMenuEvents(menuItem) {
        const textGO = menuItem.textGO;
        textGO.setInteractive();
    
        textGO.on('pointerover', () => {
          textGO.setStyle({fill: '#ff0'});
        })
    
        textGO.on('pointerout', () => {
          textGO.setStyle({fill: '#fff'});
        })

        textGO.on('pointerup', () => {
            menuItem.scene && this.scene.start(menuItem.scene);

            if (menuItem.text === "Wyjdź"){
                this.game.destroy(true);
                //this.scene.start("ExitScene");
            }
        })
    }
}

export default Menu;