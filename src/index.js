import Phaser from 'phaser';
import sky from "./assets/sky.png";
import ground   from "./assets/platform.png";
import bomb from "./assets/bomb.png";
import monkey   from "./assets/dude.png";
import star from "./assets/star.png";
class MyGame extends Phaser.Scene {
    constructor (){
        super();
    }
  
    preload() {
        this.load.image("sky", sky); 
        this.load.image("ground", ground)
        this.load.image("bomb", bomb)
        this.load.spritesheet("dude", monkey, {
            frameWidth: 32,
            frameHeight: 48,    
        })  
        this.load.image("star", star)
    }
    create() {
        this.add.image(400, 300, "sky");

        const platforms = this.physics.add.staticGroup();
        //create platforms and give them physics
        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        platforms.create(600, 400, "ground")
        platforms.create(50, 250, "ground")
        platforms.create(750, 220 , "ground")
        this.player = this.physics.add.sprite(100, 350, "dude")
        this.player.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        //animations
        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4}],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", { start: 5, end : 8 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

         
    }
    
    update() {
        //keybinding
        const cursors = this.input.keyboard.createCursorKeys();
        if(cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if(cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn"); 
        }

        if (cursors.up.isDown && this.player.touching.down){
            this.player.setVelocityY(-420 )
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,  
    physics: {
        defualt: 'arcade',
        arcade: {
            gravity: {y:450},
            debug: false,
        },
    },  
    scene: MyGame
};

const game = new Phaser.Game(config);
