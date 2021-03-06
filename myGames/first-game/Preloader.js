
BasicGame.Preloader = function (game) {

this.background = null;
this.preloadBar = null;

this.ready = false;

};

BasicGame.Preloader.prototype = {

preload: function () {

// These are the assets we loaded in Boot.js
// A nice sparkly background and a loading progress bar
this.background = this.add.sprite(0, 0, 'preloaderBackground');
this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

// This sets the preloadBar sprite as a loader sprite.
// What that does is automatically crop the sprite from 0 to full-width
// as the files below are loaded in.
this.load.setPreloadSprite(this.preloadBar);

// Here we load the rest of the assets our game needs.
// As this is just a Project Template I've not provided these assets, swap them for your own.

// Menu asets
this.load.image('girl', '_site/css/anime-wallpaper-hd-realistic-hd.jpg');
this.load.spritesheet('playButton', '_site/images/button_sprite_sheet.png', 193, 71);

// Level 1 assets
this.load.tilemap('house', 'assets/tilemaps/maps/myFirstHouse.json', null, Phaser.Tilemap.TILED_JSON);
this.load.image('tiles', 'assets/tilemaps/tiles/house.png');
this.load.image('dude', 'assets/playersprites/pikachu.png');
this.load.image('paper', 'assets/objects/paper.png');

// Level 2 assets
/*
this.load.tilemap('pitch','assets/tilemaps/maps/football-pitch.json', null, Phaser.Tilemap.TILED_JSON);
this.load.image('tiles2', 'assets/tilemaps/tiles/maxresdefault.jpg');
*/

},

create: function () {

// Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
this.preloadBar.cropEnabled = false;
this.state.start('MainMenu');
},


};


