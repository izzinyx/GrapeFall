export class Grape extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'grape');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.initAnimations();
        this.resetting = false;
        this.falling = false;
    }

    initAnimations()
    {
        this.anims.create({
            key:'fall',
            frames: this.anims.generateFrameNumbers('grape', {start: 1, end: 5}),
            frameRate: 10
        });

        this.anims.create({
            key: 'idle',
            frames: [ { key: 'grape', frame: 0}],
            frameRate: 1
        });
    }

    idle()
    {
        this.anims.play('idle', true);
    }

    fall()
    {
        console.log(this.falling);
        if(this.falling == false){
            this.falling = true;
            console.log("Falling");
            this.anims.play('fall', true);
            this.once('animationcomplete', () => {
                this.disableBody(true, true);
                this.falling = false;
                if(this.resetting == false){
                    this.resetting = true;
                    this.scene.time.delayedCall(1000, () => {
                        const x = Phaser.Math.Between(100,700);
                        this.reset(x,0);
                    }); 
                    this.resetting = false;
                }
            });
        }
    }
    reset(x,y)
    {
        this.enableBody(true, x, y, true, true);
        this.anims.play('idle', true);
        this.resetting = false;
    }
}