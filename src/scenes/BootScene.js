export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Minimal assets if needed, or leave empty
    }

    create() {
        // Jump straight to main game
        this.scene.start('GameScene');
    }
}
