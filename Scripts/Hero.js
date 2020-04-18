function Hero(map) {
  this.map = map;
  var x = 0;
  var y = 0;
  for(var i=0;i<10 && map.isSolidTileAtXY(x,y);i++){
    x = Math.floor(Math.random()*(map.chunkSize-2)+1);
    y = Math.floor(Math.random()*(map.chunkSize-2)+1);
  }
  this.x = x;
  this.y = y;
  this.width = 1;
  this.height = 1;

  this.image = Loader.getImage('hero');
}

Hero.SPEED = 4; // tiles per second

Hero.prototype.move = function (delta, dirx, diry) {
    // move hero
    dx = dirx * Hero.SPEED * delta;
    dy = diry * Hero.SPEED * delta;

    // check if we walk into a non-walkable tile
    var coor = this._collide(dx, dy);
    this.x += coor[0];
    this.y += coor[1];
    overlay.write("("+this.x+","+this.y+")\n");
};

Hero.prototype._collide = function (dx, dy) {
    var row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    var left = this.x;
    var right = this.x + this.width;
    var top = this.y ;
    var bottom = this.y + this.height;

    // check for collisions on sprite sides
    var tl = this.map.isSolidTileAtXY(left +dx, top+dy);
    var tr = this.map.isSolidTileAtXY(left +dx, bottom+dy);
    var bl = this.map.isSolidTileAtXY(right+dx, top+dy);
    var br = this.map.isSolidTileAtXY(right+dx, bottom+dy);
    
    var collision = tl||tr||bl||br;
    if (!collision) return [dx,dy];
  
    tl = this.map.isSolidTileAtXY(left +dx, top);
    tr = this.map.isSolidTileAtXY(left +dx, bottom);
    bl = this.map.isSolidTileAtXY(right+dx, top);
    br = this.map.isSolidTileAtXY(right+dx, bottom);
      
    collision = tl||tr||bl||br;
    if (!collision) return [dx,0];
    
    tl = this.map.isSolidTileAtXY(left, top+dy);
    tr = this.map.isSolidTileAtXY(left, bottom+dy);
    bl = this.map.isSolidTileAtXY(right, top+dy);
    br = this.map.isSolidTileAtXY(right, bottom+dy);
    
    collision = tl||tr||bl||br;
    if (!collision) return [0,dy];
    return [0,0];
};

Hero.prototype.scale = function(scale){
  this.height *= scale;
  this.width *= scale;
}

