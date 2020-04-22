window.onload = function () {
    var context = document.getElementById('demo').getContext('2d');
    Game.run(context);
};

//
// Game object
//

var Game = {};

Game.run = function (context) {
    this.ctx = context;
    this._previousElapsed = 0;
    this.width = context.canvas.clientWidth;
    this.height = context.canvas.clientHeight;
    context.canvas.width = this.width;
    context.canvas.height = this.height;
    
    var p = this.load();
    Promise.all(p).then(function (loaded) {
        //window.addEventListener('resize', Game.resize.bind(Game), false);
        this.init();
        window.requestAnimationFrame(this.tick);
    }.bind(this));
};

Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // clear previous frame
    this.ctx.clearRect(0, 0, this.width, this.height);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
}.bind(Game);

Game.load = function () {
    return [
        Loader.loadImage('tiles', 'images/tiles.png'),
        Loader.loadImage('hero', 'images/character.png')
    ];
};
var overlay = new Overlay();

Game.init = function () {
  Keyboard.listenForEvents(
    [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN,Keyboard.KEY_E,Keyboard.ESC]); //65-90 is a->z, and 48->57 is 0-9
  overlay.setCtx(this.ctx);
  this.tileAtlas = Loader.getImage('tiles');
  this.map = new Map();
  this.hero = new Hero(this.map);
  this.camera = new Camera(this.map, 
    this.width/Tile.tsize,
    this.height/Tile.tsize
  );
  this.window = new Window(this.ctx);
  this.mode = "walk"
  this.camera.follow(this.hero);
  this.hero.scale(.7);
  window.addEventListener("resize", this.detectResize.bind(this));
};

Game.update = function (delta) {
    // handle hero movement with arrow keys
    if (Keyboard.isDown(Keyboard.KEY_E)){
        this.mode = "talk";
    } else if (Keyboard.isDown(Keyboard.ESC)){
        this.mode = "walk";
    }
    if(this.mode == "walk"){
        var dirx = 0;
        var diry = 0;
        dirx -= Keyboard.isDown(Keyboard.LEFT);
        dirx += Keyboard.isDown(Keyboard.RIGHT);
        diry -= Keyboard.isDown(Keyboard.UP);
        diry += Keyboard.isDown(Keyboard.DOWN);
    
        this.hero.move(delta, dirx, diry);
    }else if (this.mode == "talk"){
        this.window.write(delta);
        this.window.update(delta);
    }
    this.camera.update();
};

Game._drawLayer = function (layer) {
    var map = this.map;
    
    
    var startCol = Math.floor(this.camera.x);
    var endCol =   Math.ceil(startCol + (this.camera.width));
    var startRow = Math.floor(this.camera.y);
    var endRow =   startRow + (this.camera.height)+1;
    var offsetX = -this.camera.x + startCol;
    var offsetY = -this.camera.y + startRow;

    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var x = (c - startCol + offsetX) * Tile.tsize;
            var y = (r - startRow + offsetY) * Tile.tsize;
            map.drawTile(this.ctx,layer, c, r,x,y);
        }
    }
};

Game.render = function () {
    // draw map background layer
    this._drawLayer(0);
    // draw main character
    //console.log(this.hero.image)
    this.ctx.drawImage(
        this.hero.image,
        this.hero.screenX*Tile.tsize,
        this.hero.screenY*Tile.tsize,
        this.hero.width*Tile.tsize,
        this.hero.height*Tile.tsize);

    // draw map top layer
    this._drawLayer(1);
    
    overlay.render();
    if (this.mode == "talk"){
        this.window.render();
    }
};


Game.detectResize = function () {
    // var w = document.documentElement.clientWidth;
    // var h = document.documentElement.clientHeight;
    this.ctx.canvas.width  = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.width = this.ctx.canvas.clientWidth;
    this.height = this.ctx.canvas.clientHeight;
    this.camera.reframe(this.map,
        this.width/Tile.tsize,
        this.height/Tile.tsize
    );
}