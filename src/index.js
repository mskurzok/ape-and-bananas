
import Phaser from "phaser";
import Play from './scenes/play';
import Preload from './scenes/preload';
import Menu from './scenes/menu';
import Score from './scenes/score';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [Preload, Menu, Score, Play]
};

new Phaser.Game(config);
