import Phaser from 'phaser';
import Player from '../components/Player';
import MessageBox from '../components/MessageBox';
import BoothPopup from '../components/BoothPopup';

export default class BuildingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BuildingScene' });
    }

    init(data) {
    }

    preload() {
        // Load the interior background image
        this.load.image('interior', 'assets/images/interior.png');
    }

    create() {
        // Create the interior background
        this.add.image(400, 300, 'interior').setScale(2);

        // Create player at the position passed from MainScene
        this.player = new Player(this, 340, 560);
        this.add.existing(this.player);
        this.player.setScale(2);
        this.player.direction = 'up';
        
        // Set slower animation speed for the building interior
        this.player.setWalkSpeed(5);  // Slower animation (default is 6)

        // Create message box
        this.messageBox = new MessageBox(this);
        this.add.existing(this.messageBox);

        // Create booth popup
        this.boothPopup = new BoothPopup(this);

        // Create collision objects for walls and objects in the interior
        this.createCollisions();
        
        // Create booth overlap zones
        this.createBoothZones();
        
        // Create question mark zones
        this.createQuestionZones();
        
        // Create exit zone
        this.createExitZone();

        // Add welcome message
        this.messageBox.showMessage([
            "Hey there, explorer! Welcome to the Showcase.",
            "Wander around and press E to poke at booths or interactive objects. Who knows what you'll uncover?",
          ]);
          
        // Set up input controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Set up camera to follow player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);
    }

    createCollisions() {
        // Create a physics group for all collision objects
        this.collisionObjects = this.physics.add.staticGroup();
        
        // Add collision objects for walls and objects in the interior
        // These are invisible rectangles that match the walls and objects in your image
        
        // Example: Left wall
        const leftWall = this.add.rectangle(225, 300, 32, 580, 0x000000, 0.0);
        this.collisionObjects.add(leftWall);
        
        // Example: Right wall 1
        const rightWall1 = this.add.rectangle(575, 380, 32, 206*2, 0x000000, 0.0);
        this.collisionObjects.add(rightWall1);
        
        // Example: Right wall 2
        const rightWall2 = this.add.rectangle(575, 80, 32, 45*2, 0x000000, 0.0);
        this.collisionObjects.add(rightWall2);

        // Example: Right wall Door
        const rightWallDoor = this.add.rectangle(600, 155, 32, 17*2+10, 0x000000, 0.0);
        this.collisionObjects.add(rightWallDoor);
        
        // Example: Top wall
        const topWall = this.add.rectangle(400, 20, 192*2, 20, 0x000000, 0.0);
        this.collisionObjects.add(topWall);
        
        // Example: Bottom wall
        const bottomWall = this.add.rectangle(400, 595, 192*2, 20, 0x000000, 0.0);
        this.collisionObjects.add(bottomWall);
        
        // Example: Center table
        const centerTable = this.add.rectangle(385, 140, 95, 60, 0x000000, 0.0);
        this.collisionObjects.add(centerTable);
        
        // Example: Left side table
        const leftTable1 = this.add.rectangle(353, 187, 10*2, 14*2, 0x000000, 0.0);
        this.collisionObjects.add(leftTable1);
        
        // Example: Right side table
        const rightTable1 = this.add.rectangle(417, 187, 10*2, 14*2, 0x000000, 0.0);
        this.collisionObjects.add(rightTable1);

        // Example: Left side table
        const leftTable2 = this.add.rectangle(353, 94, 10*2, 14*2, 0x000000, 0.0);
        this.collisionObjects.add(leftTable2);
        
        // Example: Right side table
        const rightTable2 = this.add.rectangle(417, 94, 10*2, 14*2, 0x000000, 0.0);
        this.collisionObjects.add(rightTable2);

        // Example: Center wall left
        const centerWallLeft = this.add.rectangle(320, 436, 81*2, 7*2, 0x000000, 0.0);
        this.collisionObjects.add(centerWallLeft);
        
        // Example: Center wall right
        const centerWallRight = this.add.rectangle(515, 436, 48*2, 7*2, 0x000000, 0.0);
        this.collisionObjects.add(centerWallRight);

        const topLeft = this.add.rectangle(272, 40, 60, 35, 0x000000, 0.0);
        this.collisionObjects.add(topLeft);

        const topRight = this.add.rectangle(495, 40, 120, 35, 0x000000, 0.0);
        this.collisionObjects.add(topRight);

        const tree1 = this.add.rectangle(255, 160, 25, 35, 0x000000, 0.0);
        this.collisionObjects.add(tree1);

        const tree2 = this.add.rectangle(255, 350, 25, 35, 0x000000, 0.0);
        this.collisionObjects.add(tree2);

        const tree3 = this.add.rectangle(255, 542, 25, 35, 0x000000, 0.0);
        this.collisionObjects.add(tree3);

        const tree4 = this.add.rectangle(418, 542, 25, 35, 0x000000, 0.0);
        this.collisionObjects.add(tree4);

        const tree5 = this.add.rectangle(545, 515, 25, 100, 0x000000, 0.0);
        this.collisionObjects.add(tree5);

        const comp = this.add.rectangle(255, 460, 25, 35, 0x000000, 0.0);
        this.collisionObjects.add(comp);

        const booth1 = this.add.rectangle(320, 350, 25, 22, 0x000000, 0.0);
        this.collisionObjects.add(booth1);

        const booth2 = this.add.rectangle(495, 350, 25, 22, 0x000000, 0.0);
        this.collisionObjects.add(booth2);

        const booth3 = this.add.rectangle(320, 262, 25, 22, 0x000000, 0.0);
        this.collisionObjects.add(booth3);

        const booth4 = this.add.rectangle(495, 262, 25, 22, 0x000000, 0.0);
        this.collisionObjects.add(booth4);

        const booth5 = this.add.rectangle(408, 305, 25, 22, 0x000000, 0.0);
        this.collisionObjects.add(booth5);
        
        // Add collider between player and collision objects
        this.physics.add.collider(this.player, this.collisionObjects);
    }

    createBoothZones() {
        // Create an array to store booth data
        this.booths = [];
        
        // Define booth data
        const boothData = [
            {
                id: 1,
                title: 'Fiverr'
            },
            {
                id: 2,
                title: 'Task Management App'
            },
            {
                id: 3,
                title: 'Portfolio Website'
            },
            {
                id: 4,
                title: 'Mobile Game'
            },
            {
                id: 5,
                title: 'Data Visualization Dashboard'
            }
        ];
        
        // Create booth zones at specific positions
        const boothPositions = [
            { x: 320, y: 350 }, // Booth 1
            { x: 495, y: 350 }, // Booth 2
            { x: 320, y: 262 }, // Booth 3
            { x: 495, y: 262 }, // Booth 4
            { x: 408, y: 305 }  // Booth 5
        ];
        
        // Create booth zones
        boothPositions.forEach((pos, index) => {
            // Create booth visual
            const booth = this.add.rectangle(pos.x, pos.y, 25, 22, 0x000000, 0.0);
            booth.setInteractive();
            booth.setData('boothData', boothData[index]);
            
            // Create interaction zone
            const zone = this.add.rectangle(pos.x, pos.y+40, 32, 32, 0x000000, 0.0);
            zone.setInteractive();
            zone.setData('boothData', boothData[index]);
            
            // Create exclamation mark indicator (initially hidden)
            const exclamation = this.add.text(pos.x, pos.y - 25, '!', {
                fontSize: '24px',
                color: '#FFD700',
                stroke: '#000',
                strokeThickness: 2
            });
            exclamation.setOrigin(0.5);
            exclamation.setVisible(false);
            exclamation.setScale(2);
            
            this.booths.push({ 
                sprite: booth, 
                zone: zone, 
                data: boothData[index], 
                exclamation: exclamation
            });
        });
    }

    createQuestionZones() {
        // Create an array to store question zone data
        this.questionZones = [];
        
        // Define question zone data
        const questionData = [
            {
                title: 'Room (Avnish?)',
                content: [
                    "*You try the handle. It doesn't move.*",
                    "Nice try, but this door's off-limits.",
                    "Besides, I'm probably in there watching you play this. 👀"
                ]
            },
            {
                title: 'TV',
                content: [
                    "*The TV crackles to life...*",
                    "Hello world! You're watching DevTV — channel 404!",
                    "Today's topic: Making games, breaking bugs, and drinking too much coffee.",
                    "Stay tuned for surprises, secrets, and maybe a dog photo."
                ]
            },
            {
                title: 'Computer',
                content: [
                    "*Screen flickers on...*",
                    "Psst! You're inside a portfolio, but shhh — don't tell anyone.",
                    "This whole world is Avnish's creation—crafted with care, coffee, and code!",
                    "Press E on stuff to learn more. Or just vibe. That works too."
                ]
            },
            {
                title: 'Server',
                content: [
                    "*faint hums and whirring of fans...*",
                    "Ah, the heartbeat of the project.",
                    "Be nice to it — it holds all the bits and bytes together.",
                    "Also.. don't unplug anything. Please."
                ]
            }
        ];
        
        // Create question zones at specific positions with custom question mark positions
        const questionPositions = [
            { 
                x: 580, 
                y: 156, 
                qX: 610, 
                qY: 156 // Room
            }, 
            { 
                x: 385, 
                y: 190, 
                qX: 385, 
                qY: 95  // TV
            }, 
            { 
                x: 290, 
                y: 510, 
                qX: 260, 
                qY: 450  // Comp
            },
            { 
                x: 270, 
                y: 90, 
                qX: 270, 
                qY: 50  // Server
            }
        ];
        
        // Create question zones
        questionPositions.forEach((pos, index) => {
            // Create question zone visual
            const zone = this.add.rectangle(pos.x, pos.y, 32, 32, 0x000000, 0.0);
            zone.setInteractive();
            zone.setData('questionData', questionData[index]);
            
            // Create question mark indicator (initially hidden) at custom position
            const questionMark = this.add.text(pos.qX, pos.qY, '?', {
                fontSize: '24px',
                color: '#3498db',
                stroke: '#000',
                strokeThickness: 2
            });
            questionMark.setOrigin(0.5);
            questionMark.setVisible(false);
            questionMark.setScale(2);
            
            this.questionZones.push({ 
                zone: zone, 
                data: questionData[index], 
                questionMark: questionMark
            });
        });
    }

    createExitZone() {
        // Create exit zone at player's starting position
        this.exitZone = this.add.zone(340, 560, 32, 32);
        this.exitZone.setInteractive({ useHandCursor: true });
        
        // Create exit exclamation mark (initially hidden)
        this.exitExclaim = this.add.text(340, 540, '!', {
            fontSize: '24px',
            color: '#FFD700',
            stroke: '#000',
            strokeThickness: 2,
            fontFamily: 'Pokemon GB'
        });
        this.exitExclaim.setOrigin(0.5);
        this.exitExclaim.setVisible(false);
        this.exitExclaim.setScale(2);
        
        // Add click handler
        this.exitZone.on('pointerdown', () => {
            if (this.player.direction === 'down') {
                this.exitBuilding();
            }
        });
    }
    
    exitBuilding() {
        // Show exit message
        this.messageBox.showMessage([
            "Heading back to the main area...",
            "Thanks for exploring the showcase!"
        ], () => {
            // Transition back to MainScene
            this.scene.start('MainScene');
        });
    }

    update() {
        // Update player
        this.player.update(this.cursors, this.wasd, this.boothPopup.active);
        
        // Check for booth interaction
        let nearBooth = false;
        let nearestBooth = null;
        let minDistance = Infinity;
        
        // First pass: find the nearest booth and show exclamation marks
        this.booths.forEach(booth => {
            // Check if player is within the interaction zone
            const playerInZone = Phaser.Geom.Rectangle.Contains(
                booth.zone.getBounds(),
                this.player.x,
                this.player.y
            );
            
            // Show/hide exclamation mark based on zone intersection with debouncing
            if (playerInZone && !this.boothPopup.active) {
                booth.exclamation.setVisible(true);
                // Clear any existing timeout
                if (booth.hideExclaimTimeout) {
                    clearTimeout(booth.hideExclaimTimeout);
                    booth.hideExclaimTimeout = null;
                }
                nearBooth = true;
                
                // Calculate distance for determining the nearest booth
                const distance = Phaser.Math.Distance.Between(
                    this.player.x,
                    this.player.y,
                    booth.zone.x,
                    booth.zone.y
                );
                
                // Track the nearest booth
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestBooth = booth;
                }
            } else {
                // Only hide the exclamation mark after a short delay to prevent flickering
                if (!booth.hideExclaimTimeout) {
                    booth.hideExclaimTimeout = setTimeout(() => {
                        booth.exclamation.setVisible(false);
                        booth.hideExclaimTimeout = null;
                    }, 150); // 150ms delay before hiding
                }
            }
        });
        
        // Check for question zone interaction
        let nearQuestion = false;
        let nearestQuestion = null;
        let minQuestionDistance = Infinity;
        
        // Check if player is in any question zone
        this.questionZones.forEach(questionZone => {
            // Check if player is within the question zone
            const playerInZone = Phaser.Geom.Rectangle.Contains(
                questionZone.zone.getBounds(),
                this.player.x,
                this.player.y
            );
            
            // Show/hide question mark based on zone intersection with debouncing
            if (playerInZone && !this.messageBox.dialogActive) {
                questionZone.questionMark.setVisible(true);
                // Clear any existing timeout
                if (questionZone.hideQuestionTimeout) {
                    clearTimeout(questionZone.hideQuestionTimeout);
                    questionZone.hideQuestionTimeout = null;
                }
                nearQuestion = true;
                
                // Calculate distance for determining the nearest question zone
                const distance = Phaser.Math.Distance.Between(
                    this.player.x,
                    this.player.y,
                    questionZone.zone.x,
                    questionZone.zone.y
                );
                
                // Track the nearest question zone
                if (distance < minQuestionDistance) {
                    minQuestionDistance = distance;
                    nearestQuestion = questionZone;
                }
            } else {
                // Only hide the question mark after a short delay to prevent flickering
                if (!questionZone.hideQuestionTimeout) {
                    questionZone.hideQuestionTimeout = setTimeout(() => {
                        questionZone.questionMark.setVisible(false);
                        questionZone.hideQuestionTimeout = null;
                    }, 150); // 150ms delay before hiding
                }
            }
        });
        
        // Check for exit zone interaction
        const playerInExitZone = Phaser.Geom.Rectangle.Contains(
            this.exitZone.getBounds(),
            this.player.x,
            this.player.y
        );
        
        // Show/hide exit exclamation mark based on player direction and zone intersection with debouncing
        if (playerInExitZone && this.player.direction === 'down' && !this.messageBox.dialogActive) {
            this.exitExclaim.setVisible(true);
            // Clear any existing timeout
            if (this.hideExitExclaimTimeout) {
                clearTimeout(this.hideExitExclaimTimeout);
                this.hideExitExclaimTimeout = null;
            }
        } else {
            // Only hide the exclamation mark after a short delay to prevent flickering
            if (!this.hideExitExclaimTimeout) {
                this.hideExitExclaimTimeout = setTimeout(() => {
                    this.exitExclaim.setVisible(false);
                    this.hideExitExclaimTimeout = null;
                }, 150); // 150ms delay before hiding
            }
        }
        
        // Second pass: handle interaction with the nearest booth
        if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
            if (nearestBooth && !this.boothPopup.active) {
                this.boothPopup.show(nearestBooth.data);
            } else if (nearestQuestion && !this.messageBox.dialogActive) {
                this.messageBox.showMessage(nearestQuestion.data.content);
            } else if (playerInExitZone && this.player.direction === 'down' && !this.messageBox.dialogActive) {
                this.exitBuilding();
            }
        }
    }
}
