import { globalData } from '../gameObjects/GlobalData.js';

export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }
    init(data) {
        this.globalData = data.globalData;
    }
    create() {
        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add.text(400, 150, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.restart = this.add.text(400, 250, 'Restart', {
            fontFamily: 'Arial Black', fontSize: 52, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.restart.setInteractive();

        this.restart.on('pointerdown', () => { this.scene.start('Game', { globalData: this.globalData }); });
        this.restart.on('pointerover', () => { this.hoverState(); });
        this.restart.on('pointerout', () => { this.restState(); });

        this.scoreText = this.add.text(10, 400, 'Score: ' + globalData.score, {fontSize: '32px', fill: '#000'});
        this.highScoreText = this.add.text(500, 400, 'HighScore: ' + globalData.highScore, {fontSize: '32px', fill: '#000'});
    }

    update() {

        if(globalData.score > globalData.highScore){
            globalData.highScore = globalData.score;
            this.newHighScoreText = this.add.text(280, 450, 'New Highscore!', {fontSize: '32px', fill: '#000'});
        }
        this.scoreText.text = 'Score: ' + globalData.score;
        this.highScoreText.text = 'HighScore: ' + globalData.highScore;
    }
    hoverState()
    {
        this.restart.setStyle({fill: '#732c96'});
    }

    restState()
    {
        this.restart.setStyle({fill: '#ffffff'})
    }
}
