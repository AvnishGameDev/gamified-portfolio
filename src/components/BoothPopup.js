import Phaser from 'phaser';

export default class BoothPopup {
    constructor(scene) {
        this.scene = scene;
        this.active = false;
        this.iframe = null;
        this.overlay = null;
        this.closeButton = null;
    }

    show(boothData) {
        if (!boothData) return;

        console.log('Showing popup for:', boothData.title);

        // Get screen dimensions
        const width = this.scene.cameras.main.width;
        const height = this.scene.cameras.main.height;
        
        // Create a semi-transparent overlay
        this.overlay = document.createElement('div');
        this.overlay.style.position = 'absolute';
        this.overlay.style.top = '0';
        this.overlay.style.left = '0';
        this.overlay.style.width = '100%';
        this.overlay.style.height = '100%';
        this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        this.overlay.style.zIndex = '1000';
        document.body.appendChild(this.overlay);
        
        // Create close button
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = '×';
        this.closeButton.style.position = 'absolute';
        this.closeButton.style.top = '10px';
        this.closeButton.style.right = '10px';
        this.closeButton.style.width = '40px';
        this.closeButton.style.height = '40px';
        this.closeButton.style.borderRadius = '50%';
        this.closeButton.style.backgroundColor = '#3498db';
        this.closeButton.style.color = 'white';
        this.closeButton.style.border = 'none';
        this.closeButton.style.fontSize = '24px';
        this.closeButton.style.cursor = 'pointer';
        this.closeButton.style.zIndex = '1002';
        this.closeButton.onclick = () => this.hide();
        document.body.appendChild(this.closeButton);
        
        // Create iframe container
        const iframeContainer = document.createElement('div');
        iframeContainer.style.position = 'absolute';
        iframeContainer.style.top = '50%';
        iframeContainer.style.left = '50%';
        iframeContainer.style.transform = 'translate(-50%, -50%)';
        iframeContainer.style.width = '80%';
        iframeContainer.style.height = '80%';
        iframeContainer.style.backgroundColor = '#2c3e50';
        iframeContainer.style.borderRadius = '10px';
        iframeContainer.style.overflow = 'hidden';
        iframeContainer.style.zIndex = '1001';
        document.body.appendChild(iframeContainer);
        
        // Create iframe
        this.iframe = document.createElement('iframe');
        this.iframe.style.width = '100%';
        this.iframe.style.height = '100%';
        this.iframe.style.border = 'none';
        
        // Determine which booth HTML file to load based on the booth ID
        let boothHtmlPath;
        if (boothData.id) {
            boothHtmlPath = `assets/webpages/booth${boothData.id}.html`;
        } else {
            boothHtmlPath = 'assets/webpages/booth1.html';
        }
        
        // Set iframe source to the appropriate HTML file
        this.iframe.src = boothHtmlPath;
        
        // Add iframe to container
        iframeContainer.appendChild(this.iframe);
        
        // Set popup active flag
        this.active = true;
    }

    hide() {
        // Remove iframe and overlay
        if (this.iframe && this.iframe.parentNode) {
            this.iframe.parentNode.remove();
            this.iframe = null;
        }
        
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        
        if (this.closeButton) {
            this.closeButton.remove();
            this.closeButton = null;
        }

        // Set popup active flag
        this.active = false;
    }
} 