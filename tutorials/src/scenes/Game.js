import { Player } from '../gameObjects/Player.js';
import { Grape } from '../gameObjects/Grape.js';
import { globalData } from '../gameObjects/GlobalData.js';

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    } 

    init(data) {
        this.globalData = data.globalData;
    }
    create() {
        this.add.image(0, 0, 'sky').setOrigin(0,0);
        
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();


        this.player = new Player(this, 100, 500);
        this.physics.add.collider(this.player, this.platforms);

        this.grape = new Grape(this, 500, 0);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            'left' : Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
        })

        this.physics.add.collider(this.grape, this.platforms, this.destroyGrapes, null, this);
        this.physics.add.overlap(this.player , this.grape, this.collectGrapes, null, this);

        this.globalData.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000' });
        this.timer = 60;
        this.timerText = this.add.text(550, 16, 'Time Left: 60', {fontSize: '32px', fill: '#000'});

        this.time.addEvent({
            delay:1000,
            callback: this.updateTimer,
            loop: true,
            callbackScope: this
        });
        this.collided = false;
    }

    update() {
        if(this.timer <= 0){
            this.endGame();
        }
        

        if(this.cursors.left.isDown || this.keys.left.isDown)
        {
            this.player.moveLeft();
        }
        else if(this.cursors.right.isDown || this.keys.right.isDown)
        {
            this.player.moveRight();
        }
        else
        {
            this.player.idle();
        }

    }

    updateTimer()
    {
        this.timer--;
        this.timerText.text='Time left: ' + this.timer;
    }

    collectGrapes(player, grape)
    {
        this.globalData.score += 1;
        this.scoreText.setText('Score: ' + this.globalData.score);
        grape.idle();
        grape.disableBody(true, true); 
        if(grape.resetting == false){
            grape.resetting = true;
            this.time.delayedCall(1500, () => {
                const x = Phaser.Math.Between(100,700);
                grape.reset(x,0);
            }); 
        }
    }

    destroyGrapes(grape)
    {
        grape.fall();
    }

    endGame()
    {
        this.scene.start('GameOver', { globalData: this.globalData });
    }
}
