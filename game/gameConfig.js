// I like to know my options (https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig).
const config = {

    title: 'this game -',           // The title of the game. Shown in the browser console.

    url: 'http://geekwagon.net',    // The URL of the game. Shown in the browser console.

    version: 'ery early version',   // The version of the game. Shown in the browser console.

    autoFocus: true,                // Automatically call window.focus() when the game boots.
                                    // Usually necessary to capture input events if the game is in
                                    // a separate frame.

    input: {
        keyboard: true,     // Keyboard input configuration. true uses the default configuration and false disables keyboard input.
        mouse: true,        // Mouse input configuration. true uses the default configuration and false disables mouse input.
        gamepad: true,      // Gamepad input configuration. true enables gamepad input.
    },

    disableContextMenu: true,       // Disable the browser's default 'contextmenu' event (usually
                                    // triggered by a right-button mouse click).

    // Physics configuration.
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scale: {
        mode: Phaser.Scale.FIT,
        width: 600,
        height: 450,
        zoom: 2
    }
};
