
//
// Keyboard handler
//

var Keyboard = {};

Keyboard.BREAK = 3;
Keyboard.BACKSPACE = 8;
Keyboard.TAB = 9;
Keyboard.CLEAR = 12;
Keyboard.ENTER = 13;
Keyboard.SHIFT = 16;
Keyboard.CTRL = 17;
Keyboard.ALT = 18;
Keyboard.PAUSE = 19;
Keyboard.CAPS_LOCK = 20;
Keyboard.ESC = 27;
Keyboard.SPACE = 32;
Keyboard.PG_UP = 33;
Keyboard.PG_DOWN = 34;
Keyboard.END = 35;
Keyboard.HOME = 36;
Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;
Keyboard.KEY_0 = 48;
Keyboard.KEY_1 = 49;
Keyboard.KEY_2 = 50;
Keyboard.KEY_3 = 51;
Keyboard.KEY_4 = 52;
Keyboard.KEY_5 = 53;
Keyboard.KEY_6 = 54;
Keyboard.KEY_7 = 55;
Keyboard.KEY_8 = 56;
Keyboard.KEY_9 = 57;
Keyboard.COLON = 58;
Keyboard.KEY_A = 65;
Keyboard.KEY_B = 66;
Keyboard.KEY_C = 67;
Keyboard.KEY_D = 68;
Keyboard.KEY_E = 69;
Keyboard.KEY_F = 70;
Keyboard.KEY_G = 71;
Keyboard.KEY_H = 72;
Keyboard.KEY_I = 73;
Keyboard.KEY_J = 74;
Keyboard.KEY_K = 75;
Keyboard.KEY_L = 76;
Keyboard.KEY_M = 77;
Keyboard.KEY_N = 78;
Keyboard.KEY_O = 79;
Keyboard.KEY_P = 80;
Keyboard.KEY_Q = 81;
Keyboard.KEY_R = 82;
Keyboard.KEY_S = 83;
Keyboard.KEY_T = 84;
Keyboard.KEY_U = 85;
Keyboard.KEY_V = 86;
Keyboard.KEY_W = 87;
Keyboard.KEY_X = 88;
Keyboard.KEY_Y = 89;
Keyboard.KEY_Z = 90;
Keyboard.NUM_0 = 96;
Keyboard.NUM_1 = 97;
Keyboard.NUM_2 = 98;
Keyboard.NUM_3 = 99;
Keyboard.NUM_4 = 100;
Keyboard.NUM_5 = 101;
Keyboard.NUM_6 = 102;
Keyboard.NUM_7 = 103;
Keyboard.NUM_8 = 104;
Keyboard.NUM_9 = 105;

Keyboard._keys = {};

Keyboard.listenForEvents = function (keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function (key) {
        this._keys[key] = false;
    }.bind(this));
}

Keyboard._onKeyDown = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
    }
};

Keyboard._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
};

Keyboard.isDown = function (keyCode) {
    if (!keyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
};
