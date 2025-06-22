import { globalData } from '../gameObjects/GlobalData.js';

export class StartMenu extends Phaser.Scene {
    constructor() {
        super('StartMenu');
    }

    init() {
       
    }

    hoverState()
    {
        this.button.setStyle({fill: '#5b6a9f'});
    }

    restState()
    {
        this.button.setStyle({fill: '#ffffff'})
    }
    
    preload() {
        // Load assets
    }

    create() {
        this.add.image(512, 384, 'background');
        this.button = this.add.text(300, 270, 'Start Game', {font: "bold 60px courier", fill: '#ffffff'}).setFontSize(35);
        this.button.setInteractive();

        this.button.on('pointerdown', () => { this.scene.start('Game', { globalData }); });
        this.button.on('pointerover', () => { this.hoverState(); });
        this.button.on('pointerout', () => { this.restState(); });
    }

}
