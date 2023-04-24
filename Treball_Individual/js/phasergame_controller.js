var config = {
    type: phaser_game.AUTO,
    width: 800,
    height: 600,
    parent: 'game_area',
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {y: 0},
            debug: false
        }
    },
    scene: [ GameScene ]
};

var game = new phaser_game.Game(config);