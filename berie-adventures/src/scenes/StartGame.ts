import startGameJSON from '../assets/json-maps/startGame.json'
import { mapSizes } from './variables.ts';

export class StartGame extends Phaser.Scene {
    constructor() {
        super('StartGame');
    }

    preload() {
        this.load.image('startGame', 'src/assets/spriteSheet/tilemap_reorganized.png');
        this.load.image('gameTitle', 'src/assets/png/startGame.png');
        this.load.tilemapTiledJSON('map', 'src/assets/json-maps/startGame.json');
    }

    create() {
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage(startGameJSON.tilesets[0].name, 'startGame', 32, 32);
        if (!tileset) return;
        const backgroundLayer = map.createLayer('background', tileset, 0, 0);
        const title = this.add.sprite(0, 0, 'gameTitle');
        const text = this.add.text(0,0, 'New Game', {
            fontFamily: 'Pixelify Sans',
            fontSize: '60px'
        });
        const objectScale = this.getScaleForObject(mapSizes.startGame.width, mapSizes.startGame.height);
        backgroundLayer?.setScale(objectScale.scaleFactor);
        backgroundLayer?.setPosition(objectScale.x, objectScale.y);
        backgroundLayer?.setOrigin(0.5);
        title?.setPosition((this.sys.game.config.width as number) / 2, (this.sys.game.config.height as number) / 2);
        title?.setOrigin(0.5);
        title?.setScale(objectScale.scaleFactor);
        text.setPosition((this.sys.game.config.width as number) / 2 - text.displayWidth / 2, (this.sys.game.config.height as number) * 0.8);
    }

    getScaleForObject(baseWidth: number, baseHeight: number) {
        const gameWidth = this.sys.game.config.width as number;
        const gameHeight = this.sys.game.config.height as number;
        const scaleX = gameWidth / mapSizes.startGame.width;
        const scaleY = gameHeight / mapSizes.startGame.height;
        const scaleFactor = Math.min(scaleX, scaleY);
        const scaledLayerWidth = baseWidth * scaleFactor;
        const scaledLayerHeight = baseHeight * scaleFactor;

        return { scaleFactor, x: gameWidth / 2 - scaledLayerWidth / 2, y: gameHeight / 2 - scaledLayerHeight / 2 }
    }
}