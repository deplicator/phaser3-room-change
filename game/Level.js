/**
 * Class representing a level (https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html)
 * @extends Phaser.Scene
 */
class Level extends Phaser.Scene {

    /** Create the level. */
    constructor() {
        super({key: 'level'});
    }

    /** Load assets. */
    preload() {

        // Player sprite.
        this.load.spritesheet({
            key: 'player',
            url: "game/assets/player.png",
            frameConfig: {frameWidth: 21,  //The width of the frame in pixels.
                          frameHeight: 26, //The height of the frame in pixels. Uses the frameWidth value if not provided.
                          startFrame: 0,   //The first frame to start parsing from.
                          endFrame: 12,    //The frame to stop parsing at. If not provided it will calculate the value based on the image and frame dimensions.
                          margin: 0,       //The margin in the image. This is the space around the edge of the frames.
                          spacing: 0}      //The spacing between each frame in the image.
        });

        // Level tiles and data.
        this.load.image("tiles", "game/assets/dungeon_tiles_2.png");
        this.load.tilemapTiledJSON("level-1", "game/assets/level-1.json");

    }

    /** Setup level. */
    create() {

        // Make map of level 1.
        this.map = this.make.tilemap({key: "level-1"});

        // Define tiles used in map.
        const tileset = this.map.addTilesetImage("dungeon_tiles_2",  "tiles", 16, 16);

        // The map layers.
        this.floorLayer = this.map.createStaticLayer("floor",        tileset);
        this.wallsLayer = this.map.createStaticLayer("walls",        tileset);
        this.aboveLayer = this.map.createStaticLayer("above_player", tileset);

        // Set physics boundaries from map width and height.
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Collisions based on layer.
        this.wallsLayer.setCollisionByProperty({collides: true});

        // Set the above player layer higher than everything else.
        this.aboveLayer.setDepth(10);

        // Setup things in this level.
        this.rooms = [];
        this.stairs = this.physics.add.group();﻿

        // Loop through all the objects.
        this.map.findObject('Objects', function(object) {

            // rooms
            if (object.type === 'Room') {
                this.rooms.push(object);
            }

            // stairs
            if (object.name === 'Stairs') {
                this.stairs.add(new Phaser.GameObjects.Sprite(this, object.x, object.y));
            }

            // spawn points
            if (object.type === 'Spawn') {
                if (object.name === 'Player') {
                    this.player = new Player(this, object.x, object.y);
                }
            }

        }, this);

        // Add collisions.
        this.physics.add.collider(this.player,  this.wallsLayer);
        this.physics.add.overlap(this.player,   this.stairs,     function() {
            this.player.onStairs = true;
        }, null, this);

        // start camera
        this.cameras.main.setZoom(2.0);

        // Set first room boundaries.
        this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
                                    this.rooms[this.player.currentRoom].y,
                                    this.rooms[this.player.currentRoom].width,
                                    this.rooms[this.player.currentRoom].height,
                                    true);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.fadeIn(2000, 0, 0, 0);

        // Listener for gamepad detection.
        this.input.gamepad.once('down', function (pad, button, index) {
            this.gamepad = pad;
        }, this);
    }

    /** Update called every tick. */
    update(time, delta) {

        /* Potential Phaser 3 bug: fade effects seem to be limited by the camera width and height
        (I'm gussing that is what _ch and _cw variabels are), these look like they are set by the
        game config width and height instead of the camera boundaries. I'm setting them to match the
        level so fade effects cover everwhere the camerea could possibly be. Moved from create so
        fade works after screen resize.
        Weird side note: with arcade physics debug on this doesn't seem to be a problem. */
        this.cameras.main._ch = this.map.heightInPixels;
        this.cameras.main._cw = this.map.widthInPixels;

        // On player room change, stop player movement, fade camerea, and set boundaries.
        if (this.player.roomChange) {

            this.cameras.main.fadeOut(250, 0, 0, 0, function(camera, progress) {
                this.player.canMove = false;
                if (progress === 1) {
                    // Change camera boundaries when fade out complete.
                    this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
                                                this.rooms[this.player.currentRoom].y,
                                                this.rooms[this.player.currentRoom].width,
                                                this.rooms[this.player.currentRoom].height,
                                                true);

                    // Fade back in with new boundareis.
                    this.cameras.main.fadeIn(500, 0, 0, 0, function(camera, progress) {
                        if (progress === 1) {
                            this.player.canMove = true;
                            this.roomStart(this.player.currentRoom);
                        }
                    }, this);
                }
            }, this);
        }
    }

    roomStart(roomNumber) {
        if (roomNumber == 4) {
            this.cameras.main.shake(2500, 0.001, true);
        }
    }
}
