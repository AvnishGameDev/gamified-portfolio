import Phaser from 'phaser';

export default class MessageBox extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        
        this.scene = scene;
        this.visible = false;
        this.dialogActive = false;
        
        // Create message box graphics
        this.box = scene.add.graphics();
        this.box.setScrollFactor(0);
        
        // Create title text
        this.title = scene.add.text(0, 0, '', {
            fontSize: '14px',
            color: '#aaaaaa',
            fontFamily: 'Pokemon GB',
            stroke: '#000000',
            strokeThickness: 2
        });
        this.title.setScrollFactor(0);
        
        // Create message text
        this.text = scene.add.text(0, 0, '', {
            fontSize: '16px',
            wordWrap: { width: 300 },
            color: '#ffffff',
            fontFamily: 'Pokemon GB',
            stroke: '#000000',
            strokeThickness: 2
        });
        this.text.setScrollFactor(0);
        
        // Add to container
        this.add([this.box, this.title, this.text]);
        
        // Add to scene
        scene.add.existing(this);
        
        // Set up input handlers
        this.scene.input.keyboard.on('keydown-SPACE', this.nextLine, this);
        this.scene.input.on('pointerdown', this.nextLine, this);
    }
    
    showMessage(lines, onComplete = null) {
        if (!Array.isArray(lines)) {
            lines = [lines];
        }
        
        this.lines = lines;
        this.currentLine = 0;
        this.onComplete = onComplete;
        this.dialogActive = true;
        this.visible = true;
        this.title.setVisible(false);
        
        this.typeLine();
    }
    
    typeLine() {
        this.isTyping = true;
        this.text.setText('');
        this.charIndex = 0;
        const fullLine = this.lines[this.currentLine];
        
        this.typingEvent = this.scene.time.addEvent({
            delay: 30,
            repeat: fullLine.length - 1,
            callback: () => {
                this.text.setText(this.text.text + fullLine[this.charIndex]);
                this.charIndex++;
                if (this.charIndex === fullLine.length) {
                    this.isTyping = false;
                    if (this.currentLine < this.lines.length - 1) {
                        this.text.setText(this.text.text + "  →");
                    }
                }
            }
        });
        
        this.updateBox();
    }
    
    nextLine() {
        if (this.isTyping) {
            this.typingEvent.remove();
            this.text.setText(this.lines[this.currentLine]);
            
            if (this.currentLine < this.lines.length - 1) {
                this.text.setText(this.text.text + "  →");
            }
            
            this.isTyping = false;
            this.updateBox();
            return;
        }
        
        this.currentLine++;
        if (this.currentLine < this.lines.length) {
            this.typeLine();
        } else {
            this.hide();
            
            if (this.onComplete) {
                this.onComplete();
            }
        }
    }
    
    updateBox() {
        const width = this.scene.cameras.main.width;
        const height = this.scene.cameras.main.height;
        const boxX = width * 0.36;
        const boxY = height - (height * 0.38);
        const boxWidth = width * 0.28;
        const boxHeight = height * 0.12;
        const padding = 20;
        const borderWidth = 4;
        
        this.box.clear();
        
        // Draw outer border
        this.box.lineStyle(borderWidth, 0xffffff, 1);
        this.box.strokeRoundedRect(boxX, boxY, boxWidth, boxHeight, 16);
        
        // Draw inner border
        this.box.lineStyle(borderWidth, 0x000000, 1);
        this.box.strokeRoundedRect(boxX + borderWidth/2, boxY + borderWidth/2, 
                                 boxWidth - borderWidth, boxHeight - borderWidth, 14);
        
        // Draw background
        this.box.fillStyle(0x000000, 0.8);
        this.box.fillRoundedRect(boxX + borderWidth, boxY + borderWidth, 
                               boxWidth - borderWidth*2, boxHeight - borderWidth*2, 12);
        
        // Position text in the center of the box
        this.text.setPosition(boxX + padding, boxY + padding);
        this.text.setWordWrapWidth(boxWidth - padding * 2);
    }
    
    hide() {
        this.visible = false;
        this.dialogActive = false;
    }
}
