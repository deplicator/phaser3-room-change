// I like to know my options (https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig).
const config = {
    width: 267,                     // The width of the game, in game pixels.

    height: 200,                    // The height of the game, in game pixels.

    zoom: 3.0,                      // Simple scale applied to the game canvas. 2 is double size,
                                    // 0.5 is half size, etc.

    resolution: 1,                  // The size of each game pixel, in canvas pixels. Values larger
                                    // than 1 are "high" resolution.

    type: Phaser.AUTO,              // Which renderer to use. Phaser.AUTO, Phaser.CANVAS,
                                    // Phaser.HEADLESS, or Phaser.WEBGL. AUTO picks WEBGL if
                                    // available, otherwise CANVAS.

    parent: null,                   // The DOM element that will contain the game canvas, or its id.
                                    // If undefined or if the named element doesn't exist, the game
                                    // canvas is inserted directly into the document body. If null
                                    // no parent will be used and you are responsible for adding the
                                    // canvas to your environment.

    canvas: null,                   // Provide your own Canvas element for Phaser to use instead of
                                    // creating one.

    canvasStyle: null,              // CSS styles to apply to the game canvas instead of Phasers
                                    // default styles.

    context: null,                  // Provide your own Canvas Context for Phaser to use, instead of
                                    // creating one.

    scene: null,                    // A scene or scenes to add to the game. If several are given,
                                    // the first is started; the remainder are started only if they
                                    // have { active: true }. See the sceneConfig argument in
                                    // Phaser.Scenes.SceneManager#add.

//  seed: 1,                        // Seed for the random number generator.    Class: RandomDataGenerator Phaser.Math. RandomDataGenerator If you create your own instance of this class you should provide a seed for it. If no seed is given it will use a 'random' one based on Date.now.

    title: 'this game -',           // The title of the game. Shown in the browser console.

    url: 'http://geekwagon.net',    // The URL of the game. Shown in the browser console.

    version: 'ery early version',   // The version of the game. Shown in the browser console.

    autoFocus: true,                // Automatically call window.focus() when the game boots.
                                    // Usually necessary to capture input events if the game is in
                                    // a separate frame.

    input: {
        keyboard: true,     //Keyboard input configuration. true uses the default configuration and false disables keyboard input.
        mouse: true,        //Mouse input configuration. true uses the default configuration and false disables mouse input.
        touch: true,        //Touch input configuration. true uses the default configuration and false disables touch input.
        gamepad: false,     //Gamepad input configuration. true enables gamepad input.
        activePointers: 1,  //The maximum number of touch pointers. See Phaser.Input.InputManager#pointers.
        smoothFacto: 0,     //The smoothing factor to apply during Pointer movement. See Phaser.Input.Pointer#smoothFactor.
        inputQueue: false,  //Should Phaser use a queued input system for native DOM Events or not?
        windowEvents: true, //Should Phaser listen for input events on the Window? If you disable this, events like 'POINTER_UP_OUTSIDE' will no longer fire.
    },

    disableContextMenu: true,       // Disable the browser's default 'contextmenu' event (usually
                                    // triggered by a right-button mouse click).

    transparent: false,             // Whether the game canvas will have a transparent background.

    banner: {                       // Configuration for the banner printed in the browser console
                                    // when the game starts.

        hidePhaser: true,           // Omit Phaser's name and version from the banner.

        text: '#ffffff',            // The color of the banner text.

        background: '#000000'       // The background colors of the banner.
    },

    dom: {                          // [Phaser.Types.Core.DOMContainerConfig] The DOM Container
                                    // configuration object.

        createContainer: false,     // Should the game create a div element to act as a DOM
                                    // Container? Only enable if you're using DOM Element objects.
                                    // You must provide a parent object if you use this feature.

        behindCanvas: false },      // Should the DOM Container that is created (if
                                    // dom.createContainer is true) be positioned behind (true) or
                                    // over the top (false, the default) of the game canvas?

    fps: {                          // [Phaser.Types.Core.FPSConfig] Game loop configuration.

        min: 5,                     // The minimum acceptable rendering rate, in frames per second.

        target: 60,                 // The optimum rendering rate, in frames per second.

        forceSetTimeOut: false,     // Use setTimeout instead of requestAnimationFrame to run the
                                    // game loop.

        deltaHistory: 10,           // Calculate the average frame delta from this many consecutive
                                    // frame intervals.

        panicMax: 120,              // The amount of frames the time step counts before we trust the
                                    // delta values again.
    },

//    render	Phaser.Types.Core.RenderConfig // Game renderer configuration.

    backgroundColor: 0x000000, // The background color of the game canvas. The default is black.

//    callbacks	Phaser.Types.Core.CallbacksConfig	<optional>     // Optional callbacks to run before or after game boot.

//    loader	Phaser.Types.Core.LoaderConfig	<optional>    // Loader configuration.

//    images	Phaser.Types.Core.ImagesConfig	<optional>    // Images configuration.

    physics: { // Physics configuration.
        default: 'arcade', // I'll get back to this
        arcade: {
            debug: false
        }
    },

//    plugins	Phaser.Types.Core.PluginObject | Array.<Phaser.Types.Core.PluginObjectItem>	<optional>    // Plugins to install.

//    scale	Phaser.Types.Core.ScaleConfig	<optional>    // The Scale Manager configuration.

//    audio	Phaser.Types.Core.AudioConfig	<optional>    // The Audio Configuration object.

};
