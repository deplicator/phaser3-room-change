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
            frameConfig: {frameWidth: 21,
                          frameHeight: 26,
                          startFrame: 0,
                          endFrame: 12,
                          margin: 1,
                          spacing: 0}
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
        const tileset = this.map.addTilesetImage("dungeon_tiles_2",  "tiles", 16, 16,);

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
        this.cameras.main.startFollow(this.player);
    }

    /** Update called every tick. */
    update(time, delta) {

        // Change camera boundaries when player moves to new room.
        if (this.player.roomChange) {
            this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
                                        this.rooms[this.player.currentRoom].y,
                                        this.rooms[this.player.currentRoom].width,
                                        this.rooms[this.player.currentRoom].height,
                                        true);
        }
    }
}
