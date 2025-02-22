import Phaser from 'phaser';
import {scenes} from './scenes/scenes.ts';

new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#f4a460',
    scene: scenes
});
