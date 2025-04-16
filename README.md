# Gamified Portfolio

A Phaser.js-based gamified portfolio with oldschool GameBoy themed game. Inspired by Pokemon Red & Blue.

## Project Structure

```
gamified-portfolio/
├── public/              # Static assets
│   └── assets/          # Game assets (images, tilemaps, etc.)
├── src/
│   ├── components/      # Reusable game components
│   │   ├── Player.js    # Player character component
│   │   ├── NPC1.js      # NPC character component
│   │   └── MessageBox.js # Dialog box component
│   ├── scenes/          # Game scenes
│   │   ├── MainScene.js # Main game scene
│   │   └── BuildingScene.js # Building interior scene
│   ├── game.js          # Phaser game configuration
│   └── main.js          # Entry point
├── index.html           # HTML entry point
└── package.json         # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   `npm install`
   or
   `yarn`

### Development

Run the development server:

`npm run dev`
or
`yarn dev`

### Building for Production

Build the project for production:

`npm run build`
or
`yarn build`

Preview the production build:

`npm run preview`
or
`yarn preview`

## Game Controls

- **Arrow Keys** or **WASD**: Move the player
- **E**: Interact with NPCs and buildings
- **Space** or **Click**: Advance through dialog

## Features

- Responsive design that adapts to window size
- Tilemap-based world with collision detection
- Character animations for walking and idle states
- NPC interaction with dialog system
- Building interior scene with scene transition

<!--## Screenshots

Here are some images of the gamified portfolio in action: -->

<!-- ![Game Screenshot 1](public/assets/screenshot1.png) -->
<!-- ![Game Screenshot 2](public/assets/screenshot2.gif) -->

## Contributing

Contributions are welcome! Feel free to open issues, submit pull requests, or suggest features. Please make sure to follow the existing code style and write clear commit messages.

### Steps to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with a detailed description of what you changed or added

## License

This project is licensed under the MIT License - see the [LICENSE]() file for details.
