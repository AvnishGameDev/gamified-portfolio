import Phaser from 'phaser';

export default class NPC1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture = 'npc1') {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setSize(12, 16);
        this.setOffset(2, 4);

        this.direction = 'south';

        this.createAnimations(scene);
        this.play('npc1-idle-south');
    }

    createAnimations(scene) {
        const anims = scene.anims;

        // Idle animations
        anims.create({ 
            key: 'npc1-idle-south', 
            frames: [{ key: 'npc1', frame: 0 }], 
            frameRate: 1, 
            repeat: -1 
        });
        anims.create({ 
            key: 'npc1-idle-north', 
            frames: [{ key: 'npc1', frame: 1 }], 
            frameRate: 1, 
            repeat: -1 
        });
        anims.create({ 
            key: 'npc1-idle-west', 
            frames: [{ key: 'npc1', frame: 2 }], 
            frameRate: 1, 
            repeat: -1 
        });
        anims.create({ 
            key: 'npc1-idle-east', 
            frames: [{ key: 'npc1', frame: 3 }], 
            frameRate: 1, 
            repeat: -1 
        });

        // Walk animations
        anims.create({ 
            key: 'npc1-walk-south', 
            frames: anims.generateFrameNumbers('npc1', { start: 4, end: 5 }), 
            frameRate: 6, 
            repeat: -1 
        });
        anims.create({ 
            key: 'npc1-walk-north', 
            frames: anims.generateFrameNumbers('npc1', { start: 6, end: 7 }), 
            frameRate: 6, 
            repeat: -1 
        });
        anims.create({ 
            key: 'npc1-walk-west', 
            frames: anims.generateFrameNumbers('npc1', { start: 8, end: 9 }), 
            frameRate: 6, 
            repeat: -1 
        });
        anims.create({ 
            key: 'npc1-walk-east', 
            frames: anims.generateFrameNumbers('npc1', { start: 10, end: 11 }), 
            frameRate: 6, 
            repeat: -1 
        });
    }

    face(direction) {
        this.direction = direction;
        this.play(`npc1-idle-${direction}`);
    }

    update() {
        // You can later add logic to make the NPC walk or guide the player
        // For now, just keep idle animation facing the correct direction
    }
}
