
BasicGame.Level1 = function (game) {

// When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;	// a reference to the currently running game
    this.add;	// used to add sprites, text, groups, etc
    this.camera;	// a reference to the game camera
    this.cache;	// the game cache
    this.input;	// the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;	// for preloading assets
    this.math;	// lots of useful common math operations
    this.sound;	// the sound manager - add a sound, play one, set-up markers, etc
    this.stage;	// the game stage
    this.time;	// the clock
    this.tweens; // the tween manager
    this.state;	// the state manager
    this.world;	// the game world
    this.particles;	// the particle manager
    this.physics;	// the physics manager
    this.rnd;	// the repeatable random number generator

    // You can use any of these from any function within this State.
    // But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

var map;
var layer = {};
var cursors;
var player;
var button;
var paper;

BasicGame.Level1.prototype = {

create: function() {
 
    this.physics.startSystem(Phaser.Physics.P2JS);

    //  The 'house' key here is the Loader key given in game.load.tilemap
    map = this.add.tilemap('house');
    // Map the .png files into the tiles cache
    map.addTilesetImage('house', 'tiles');
    
    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer[0] = map.createLayer('floor');
    layer[0].resizeWorld();
    layer[1] = map.createLayer('objects');
    layer[1].resizeWorld();
    
    map.setCollisionBetween(1, 12);
    this.physics.p2.convertTilemap(map, layer[1]);

    // Now we create the individual paper
    paper = this.add.sprite(250, 500, 'paper');
    paper.scale.setTo(0.7,0.7);

    this.physics.p2.enable(paper, false);
    paper.body.setRectangle(10, 10, 0, 0);
 
    // We create the player
    player = this.add.sprite(200, 250, 'dude');
    player.smoothed = false;
    
    //  We need to enable physics on the player
    this.physics.p2.enable(player, false);
    
    player.body.setCircle(10);
    // disable rotation
    player.body.fixedRotation = true;

    
    //  Our controls.
    cursors = this.input.keyboard.createCursorKeys();
    
    // The camera follows the player
    this.camera.follow(player);

    
    // The timer. After 20 seconds its game over.
    this.time.events.add(Phaser.Timer.SECOND * 20, this.gameOver,this);
    
    // full screen 
    this.stage.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    
    
    this.input.onDown.add(this.fullScreen, this);
    
    
    // We create a body specific callback
    player.body.createBodyCallback(paper, this.hitPaper, this);
    
    // Turn on impact events for the world.
     this.physics.p2.setImpactEvents(true);
    
   
    
},

hitPaper: function (body1, body2) {
  body2.sprite.kill();
  this.state.start('Level2');
}, // hitPaper

fullScreen: function () {

this.game.scale.startFullScreen();

}, // fullScreen

// Game over function after 20 seconds. Makes the whole thing fade away 
gameOver: function () {
 
  
  // Fades everything
  this.add.tween(player).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
  this.add.tween(map).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
  this.add.tween(layer[0]).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
  this.add.tween(layer[1]).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
  this.add.tween(paper).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
  

}, // gameOver 


update: function () {

    player.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
    	player.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
    	player.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
    	player.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
    	player.body.moveDown(200);
    }

},

render: function () {
  
  this.game.debug.text("Time until Game Over: " + this.time.events.duration, 32, 32);
  
  this.game.debug.text("You must get the piece of paper.", 480, 32);

  // Full screen 
  if (this.stage.scale.isFullScreen)
    {
        this.game.debug.text('ESC to leave fullscreen', 270, 580);
    }
    else
    {
        this.game.debug.text('Click to go fullscreen', 270, 580);
    }


}, // render

quitGame: function (pointer) {

// Here you should destroy anything you no longer need.
// Stop music, delete sprites, purge caches, free resources, all that good stuff.

// Then let's go back to the main menu.
this.state.start('MainMenu');

},

};
