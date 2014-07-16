var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'House', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('house', 'assets/tilemaps/maps/myFirstHouse.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/tiles/house.png');
    game.load.image('dude', 'assets/playersprites/phaser-dude.png');
    game.load.script('filter', '../filters/Fire.js');

} // Preload

var map;
var layer = {};
var cursors;
var player;
var button;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    
    // game.stage.backgroundColor = '#787878';

    //  The 'desert' key here is the Loader key given in game.load.tilemap
    map = game.add.tilemap('house');
    // Map the .png files into the tiles cache
    map.addTilesetImage('house', 'tiles');
    
    
         

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer[0] = map.createLayer('floor');
    layer[0].resizeWorld();
    layer[1] = map.createLayer('objects');
    layer[1].resizeWorld();
    
    map.setCollisionBetween(1, 12);
    game.physics.p2.convertTilemap(map, layer[1]);
    
    // We create the player
    player = game.add.sprite(200, 250, 'dude');
    
    //  We need to enable physics on the player
    game.physics.p2.enable(player);

    game.camera.follow(player);
    

    //  Our 4 animations, walking left, right, up and down.
    /* player.animations.add('left', [5, 6, 7, 8, 9], 10, true);
    player.animations.add('right', [15, 16, 17, 18, 19], 10, true);
    player.animation.add('up', [10 , 11, 12, 13, 14], 10, true);
    player.animation.add('down',[1, 2, 3, 4], 10, true); */
    
    // disable rotation
    player.body.fixedRotation = true;

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    // The timer. After 20 seconds its game over.
    game.time.events.add(Phaser.Timer.SECOND * 20, gameOver, this);
    
    // full screen 
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    
    game.input.onDown.add(fullScreen, this);

    

} // create

function fullScreen() {

game.scale.startFullScreen();

} // fullScreen

// Game over function after 20 seconds. Makes the whole thing fade away 
function gameOver() {
 
  
  // Fades both the player and the map
  game.add.tween(player).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
  game.add.tween(map).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
  game.add.tween(layer[0]).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
  game.add.tween(layer[1]).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
 
  

  } // gameOver 

function update() {

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

    
    
} // update

function render() {
  
  game.debug.text("Time until Game Over: " + game.time.events.duration, 32, 32);
  
  game.debug.text("You must get the candle.", 480, 32);

  // Full screen 
  if (game.scale.isFullScreen)
    {
        game.debug.text('ESC to leave fullscreen', 270, 580);
    }
    else
    {
        game.debug.text('Click to go fullscreen', 270, 580);
    }


} // render
