import Phaser from 'phaser';
import Player from '../components/Player.js';
import NPC1 from '../components/NPC1.js';
import MessageBox from '../components/MessageBox.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Create loading text
        const loadingText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Loading assets...',
            { fontSize: '24px', fill: '#ffffff', fontFamily: 'Pokemon GB' }
        );
        loadingText.setOrigin(0.5);
        loadingText.setScrollFactor(0);

        // Load game assets with error handling
        try {
            // Load tilemap and tileset
            this.load.image('tiles', 'assets/images/jungle.png');
            this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap.json');
            
            // Load spritesheets
            this.load.spritesheet('player', 'assets/images/player.png', {
                frameWidth: 16,
                frameHeight: 20
            });
            this.load.spritesheet('npc1', 'assets/images/npc1.png', {
                frameWidth: 16,
                frameHeight: 20
            });    
            
            // Load building image
            this.load.image('building', 'assets/images/building.png');
        } catch (error) {
            console.error('Error loading assets:', error);
            loadingText.setText('Error loading assets. Using fallback content.');
        }
    }

    create() {
        // TEMPORARY: Direct transition to BuildingScene for testing
        // this.time.delayedCall(100, () => {
        //     console.log('Temporary transition to BuildingScene for testing');
        //     this.scene.start('BuildingScene', { playerPosition: { x: 400, y: 300 } });
        //     return;
        // });
        
        // Create a simple background as fallback
        this.add.rectangle(0, 0, 1600, 1600, 0x2c3e50).setOrigin(0);
        
        // Try to create tilemap, but handle errors gracefully
        let map, tileset, layer;
        try {
            map = this.make.tilemap({ key: 'map' });
            tileset = map.addTilesetImage('jungle', 'tiles');
            layer = map.createLayer("Tile Layer 1", tileset, 0, 0);
            
            if (layer) {
                layer.setAlpha(1);
                
                // Set camera bounds and zoom
                this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
                this.cameras.main.setZoom(2);
                this.cameras.main.scrollX = 100;
                this.cameras.main.scrollY = 100;
                
                // Fill screen with filler tiles
                this.fillScreenWithFiller(map, layer);
                
                // Set up collisions
                const walkableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 24, 25, 26, 27, 28, 29, 30];
                layer.forEachTile(tile => {
                    if (!walkableTiles.includes(tile.index)) {
                        tile.setCollision(true);
                    }
                });
            }
        } catch (error) {
            console.error('Error creating tilemap:', error);
            // Create a simple grid as fallback
            this.createFallbackGrid();
        }

        // Create message box component
        this.messageBox = new MessageBox(this);

        // Show control instructions
        this.messageBox.showMessage([
            "Welcome to the interactive portfolio! Press space or click to continue",
            "Use WASD or Arrow Keys to move",
            "Press E to interact with NPCs and objects",
            "You're all set to go!"
        ]);

        // Create player with error handling
        try {
            // Change player spawn position to a more accessible location
            this.player = new Player(this, 785, 1420);
            this.cameras.main.startFollow(this.player);
            
            // Set world bounds to match the map size or a reasonable size
            this.physics.world.setBounds(0, 0, 1600, 1600);
            
            // Disable world bounds collision for the player
            this.player.setCollideWorldBounds(false);
            
            if (layer) {
                this.physics.add.collider(this.player, layer);
                
                // Check if the player's position has walkable tiles underneath
                const tileX = Math.floor(this.player.x / 32);
                const tileY = Math.floor(this.player.y / 32);
                const tileIndex = layer.getTileAt(tileX, tileY).index;
                
                // Make sure the player's starting position is on a walkable tile
                if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 24, 25, 26, 27, 28, 29, 30].includes(tileIndex)) {
                    // Find a nearby walkable tile
                    for (let y = tileY; y < tileY + 5; y++) {
                        for (let x = tileX - 2; x < tileX + 3; x++) {
                            const checkTile = layer.getTileAt(x, y);
                            if (checkTile && [1, 2, 3, 4, 5, 6, 7, 8, 9, 24, 25, 26, 27, 28, 29, 30].includes(checkTile.index)) {
                                this.player.setPosition(x * 32 + 16, y * 32 + 16);
                                break;
                            }
                        }
                    }
                }
            }
        } catch (error) {
            // Create a simple player representation
            this.player = this.add.rectangle(400, 300, 16, 20, 0x3498db);
            this.physics.add.existing(this.player);
        }

        // Create NPC1 with error handling
        try {
            this.npc1 = new NPC1(this, 800, 1200);
            this.npc1.setImmovable(true);
            
            // Add collision between NPC and player
            this.physics.add.collider(this.player, this.npc1);
            
            // Create NPC1 indicator
            this.npc1Indicator = this.add.text(this.npc1.x, this.npc1.y - 8, '!', {
                font: '18px Pokemon GB',
                fill: '#FFD700',
                stroke: '#000',
                strokeThickness: 2
            });
            this.npc1Indicator.setOrigin(0.5, 1);
            this.npc1Indicator.setScrollFactor(1);
            this.npc1Indicator.setVisible(false);
        } catch (error) {
            console.error('Error creating NPC1:', error);
            // Create a simple NPC representation
            this.npc1 = this.add.rectangle(800, 1200, 16, 20, 0xe74c3c);
            this.physics.add.existing(this.npc1);
            this.npc1.body.setImmovable(true);
            
            // Add collision between NPC and player for fallback case
            this.physics.add.collider(this.player, this.npc1);
            
            this.npc1Indicator = this.add.text(800, 1192, '!', {
                font: '18px Pokemon GB',
                fill: '#FFD700',
                stroke: '#000',
                strokeThickness: 2
            });
            this.npc1Indicator.setOrigin(0.5, 1);
            this.npc1Indicator.setScrollFactor(1);
            this.npc1Indicator.setVisible(false);
        }

        // NPC1 conversation flags
        this.hasTalkedToNpc1 = false;
        this.npc1Walking = false;
        this.npc1TargetY = 728;
        this.npc1Finished = false;

        // Create building with error handling
        try {
            this.building = this.physics.add.staticImage(798, 564, 'building');
            this.physics.add.collider(this.player, this.building);
        } catch (error) {
            console.error('Error creating building:', error);
            // Create a simple building representation
            this.building = this.add.rectangle(798, 564, 64, 64, 0x8e44ad);
            this.physics.add.existing(this.building, true);
            this.physics.add.collider(this.player, this.building);
        }
        
        // Building interaction zone
        this.buildingZone = this.add.zone(742, 606, 16, 16);
        this.physics.world.enable(this.buildingZone);
        this.buildingZone.body.setAllowGravity(false);
        this.buildingZone.body.moves = false;
        this.nearBuilding = false;
        
        // Building exclamation mark
        this.buildingExclaim = this.add.text(756, 600, '!', {
            fontSize: '24px',
            color: '#FFD700',
            stroke: '#000',
            strokeThickness: 2,
            fontFamily: 'Pokemon GB'
        });
        this.buildingExclaim.setOrigin(0.5);
        this.buildingExclaim.setVisible(false);
        this.buildingExclaim.setScrollFactor(1);

        // Input keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Add a message about missing assets
        if (!map || !tileset || !layer) {
            this.messageBox.showMessage([
                "Welcome to the game!",
                "Some assets are missing. Please add the required assets to the public/assets folder.",
                "Check the console for more details."
            ]);
        }
    }

    update(time, delta) {
        // Update player
        if (this.player && this.player.update) {
            this.player.update(this.cursors, this.wasd, this.messageBox.dialogActive);
        } else {
            // Simple player movement for fallback
            const speed = 80;
            if (this.cursors.left.isDown) {
                this.player.body.setVelocityX(-speed);
            } else if (this.cursors.right.isDown) {
                this.player.body.setVelocityX(speed);
            } else {
                this.player.body.setVelocityX(0);
            }
            
            if (this.cursors.up.isDown) {
                this.player.body.setVelocityY(-speed);
            } else if (this.cursors.down.isDown) {
                this.player.body.setVelocityY(speed);
            } else {
                this.player.body.setVelocityY(0);
            }
        }

        // Update NPC1
        this.updateNPC1();

        // Update building interaction
        this.updateBuildingInteraction();
    }

    createFallbackGrid() {
        // Create a simple grid as fallback for the tilemap
        const gridSize = 32;
        const gridWidth = 50;
        const gridHeight = 50;
        
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                const color = (x + y) % 2 === 0 ? 0x2ecc71 : 0x27ae60;
                this.add.rectangle(x * gridSize, y * gridSize, gridSize, gridSize, color).setOrigin(0);
            }
        }
        
        // Set camera bounds for the fallback grid
        this.cameras.main.setBounds(0, 0, gridWidth * gridSize, gridHeight * gridSize);
        this.cameras.main.setZoom(1);
    }

    fillScreenWithFiller(map, layer) {
        if (!map || !layer) return;
        
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
        const tileWidth = map.tileWidth;
        const tileHeight = map.tileHeight;
    
        const screenCols = Math.ceil(screenWidth / tileWidth);
        const screenRows = Math.ceil(screenHeight / tileHeight);
    
        for (let y = 0; y < screenRows; y++) {
            for (let x = 0; x < screenCols; x++) {
                if (!map.hasTileAt(x, y)) {
                    map.putTileAt(22, x, y, true, layer);
                }
            }
        }
    }

    updateNPC1() {
        if (!this.npc1) return;
        
        // Update NPC exclamation position
        if (this.npc1Indicator) {
            this.npc1Indicator.setPosition(this.npc1.x, this.npc1.y - 8);
        }

        // Interaction
        const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc1.x, this.npc1.y);

        if (dist < 40 && !this.npc1Walking) {
            if (this.npc1Indicator) {
                this.npc1Indicator.setVisible(true);
            }

            if (Phaser.Input.Keyboard.JustDown(this.interactKey) && !this.messageBox.dialogActive) {
                if (!this.hasTalkedToNpc1) {
                    this.hasTalkedToNpc1 = true;
                    this.startNpc1Conversation();
                } else if (this.npc1Finished) {
                    this.messageBox.showMessage([
                        "Go on! There's interesting stuff inside"
                    ]);
                }
            }
        } else {
            if (this.npc1Indicator) {
                this.npc1Indicator.setVisible(false);
            }
        }

        // NPC Walk north
        if (this.npc1Walking) {
            if (this.npc1.y > this.npc1TargetY) {
                this.npc1.setVelocityY(-90);
                if (this.npc1.play) {
                    this.npc1.play('npc1-walk-north', true);
                }
            } else {
                this.npc1.setVelocityY(0);
                if (this.npc1.play) {
                    this.npc1.play('npc1-idle-north');
                }
                this.npc1Walking = false;
        
                if (!this.npc1Finished) {
                    this.npc1Finished = true;
                    this.messageBox.showMessage([
                        "Alright, we're here. This place holds many secrets...", 
                        "Enter the building through the door by pressing E"
                    ]);
                }
            }
        }
    }

    updateBuildingInteraction() {
        if (!this.player || !this.buildingZone) return;
        
        // Check if player is near building
        this.physics.add.overlap(this.player, this.buildingZone, () => {
            this.nearBuilding = true;
        }, null, this);

        // Show building exclamation mark with debouncing to prevent flickering
        if (this.nearBuilding && !this.messageBox.dialogActive) {
            if (this.buildingExclaim) {
                this.buildingExclaim.setVisible(true);
                // Clear any existing timeout
                if (this.hideExclaimTimeout) {
                    clearTimeout(this.hideExclaimTimeout);
                    this.hideExclaimTimeout = null;
                }
            }
        } else {
            // Only hide the exclamation mark after a short delay to prevent flickering
            if (this.buildingExclaim && !this.hideExclaimTimeout) {
                this.hideExclaimTimeout = setTimeout(() => {
                    if (this.buildingExclaim) {
                        this.buildingExclaim.setVisible(false);
                    }
                    this.hideExclaimTimeout = null;
                }, 150); // 150ms delay before hiding
            }
        }

        // Handle building interaction
        if (this.nearBuilding && Phaser.Input.Keyboard.JustDown(this.eKey)) {
            this.enterBuilding();
        }

        this.nearBuilding = false;
    }

    startNpc1Conversation() {
        this.messageBox.showMessage([
            "Hey! I have something important to show you.",
            "Follow me, I'll take you somewhere interesting.",
            "Let's go!"
        ], () => {
            this.npc1Walking = true;
        });
    }

    enterBuilding() {
        // Transition to the BuildingScene
        this.scene.start('BuildingScene', { 
            playerPosition: { x: 400, y: 300 } 
        });
    }
}
