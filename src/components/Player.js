import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setCollideWorldBounds(true);
        this.direction = 'down'; // Initialize direction property
        this.walkFrameRate = 6; // Default walk animation speed
        this.createAnimations(scene);
        this.play('idle-down');
    }

    createAnimations(scene) {
        const anims = scene.anims;

        // Only create animations if they don't already exist
        if (!anims.exists('idle-down')) {
            anims.create({
                key: 'idle-down',
                frames: [{ key: 'player', frame: 0 }],
                frameRate: 1
            });
        }

        if (!anims.exists('idle-left')) {
            anims.create({
                key: 'idle-left',
                frames: [{ key: 'player', frame: 3 }],
                frameRate: 1
            });
        }

        if (!anims.exists('idle-up')) {
            anims.create({
                key: 'idle-up',
                frames: [{ key: 'player', frame: 6 }],
                frameRate: 1
            });
        }

        if (!anims.exists('idle-right')) {
            anims.create({
                key: 'idle-right',
                frames: [{ key: 'player', frame: 9 }],
                frameRate: 1
            });
        }

        if (!anims.exists('walk-down')) {
            anims.create({
                key: 'walk-down',
                frames: anims.generateFrameNumbers('player', { start: 1, end: 2 }),
                frameRate: this.walkFrameRate,
                repeat: -1
            });
        }

        if (!anims.exists('walk-left')) {
            anims.create({
                key: 'walk-left',
                frames: anims.generateFrameNumbers('player', { start: 4, end: 5 }),
                frameRate: this.walkFrameRate,
                repeat: -1
            });
        }

        if (!anims.exists('walk-up')) {
            anims.create({
                key: 'walk-up',
                frames: anims.generateFrameNumbers('player', { start: 7, end: 8 }),
                frameRate: this.walkFrameRate,
                repeat: -1
            });
        }

        if (!anims.exists('walk-right')) {
            anims.create({
                key: 'walk-right',
                frames: anims.generateFrameNumbers('player', { start: 10, end: 11 }),
                frameRate: this.walkFrameRate,
                repeat: -1
            });
        }
    }

    // Method to change animation speed
    setWalkSpeed(frameRate) {
        this.walkFrameRate = frameRate;
        
        // Recreate walk animations with new speed
        const anims = this.scene.anims;
        
        // Remove existing walk animations
        anims.remove('walk-down');
        anims.remove('walk-left');
        anims.remove('walk-up');
        anims.remove('walk-right');
        
        // Create new walk animations with updated speed
        anims.create({
            key: 'walk-down',
            frames: anims.generateFrameNumbers('player', { start: 1, end: 2 }),
            frameRate: this.walkFrameRate,
            repeat: -1
        });
        
        anims.create({
            key: 'walk-left',
            frames: anims.generateFrameNumbers('player', { start: 4, end: 5 }),
            frameRate: this.walkFrameRate,
            repeat: -1
        });
        
        anims.create({
            key: 'walk-up',
            frames: anims.generateFrameNumbers('player', { start: 7, end: 8 }),
            frameRate: this.walkFrameRate,
            repeat: -1
        });
        
        anims.create({
            key: 'walk-right',
            frames: anims.generateFrameNumbers('player', { start: 10, end: 11 }),
            frameRate: this.walkFrameRate,
            repeat: -1
        });
        
        // If currently walking, update the animation
        if (this.anims.currentAnim && this.anims.currentAnim.key.startsWith('walk-')) {
            this.play(this.anims.currentAnim.key, true);
        }
    }

    update(cursors, wasd, isPopupActive) {
        // Block movement if either message box or booth popup is active
        if (isPopupActive || (this.scene.messageBox && this.scene.messageBox.dialogActive)) {
            this.setVelocity(0);
            this.play(`idle-${this.direction}`, true);
            return;
        }

        // Allow movement when no popups are active
        const speed = 100;
        let vx = 0;
        let vy = 0;

        // Check both cursor keys and WASD
        if (cursors.left.isDown || (wasd && wasd.left.isDown)) {
            vx = -speed;
            this.direction = 'left';
            this.play('walk-left', true);
        } else if (cursors.right.isDown || (wasd && wasd.right.isDown)) {
            vx = speed;
            this.direction = 'right';
            this.play('walk-right', true);
        } else if (cursors.up.isDown || (wasd && wasd.up.isDown)) {
            vy = -speed;
            this.direction = 'up';
            this.play('walk-up', true);
        } else if (cursors.down.isDown || (wasd && wasd.down.isDown)) {
            vy = speed;
            this.direction = 'down';
            this.play('walk-down', true);
        } else {
            // Make sure direction is defined before playing idle animation
            if (this.direction) {
                this.play(`idle-${this.direction}`, true);
            } else {
                this.direction = 'down'; // Default to down if undefined
                this.play('idle-down', true);
            }
        }

        this.setVelocity(vx, vy);
    }
}
