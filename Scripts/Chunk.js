function Chunk(map,size,x,y){
  this.map = map;
  this.x = x;
  this.y = y;
  this.size = size;
  var next = []
  for(var i=-1;i<=1;i++){
    for(var j=-1;j<=1;j++){
      var spot = [x+i,y+j];
      if(spot in map.chunks && !(map.chunks[spot].biome == null)){
        next.push(map.chunks[spot].biome)
      }
    }
  }
  // do stuff with next to pick your biome. 
  this.pickBiome(next);
  this.tiles = null;
}

Chunk.prototype.pickBiome = function(next){
  var options = {"earth":1,"water":1,"air":1,"fire":1};
  next.forEach(function(x){options[x] += 1;});
  var total = 0;
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      total += options[key];
    }
  }
  total *= Math.random();
  
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      total -= options[key];
    }
    if(total <0){
      this.biome = key;
      break;
    }
  }
  console.log(this.biome);
}

Chunk.prototype.drawTile = function(ctx,layer,x,y,ex,ey){
  if (this.tiles==null){
    this.generate();
  }
  return this.tiles[x][y].draw(ctx,layer,ex,ey);
};

Chunk.prototype.isSolidTileAtXY = function(x,y){
  // 3's and 5's
  if (this.tiles==null){
    this.generate();
  }
  return this.tiles[x][y].solid;
}
  
Chunk.prototype.generate = function(){
  var next = [];
  for(var i=-1;i<=1;i++){
    next[i+1] = [];
    for(var j=-1;j<=1;j++){
      next[i+1][j+1] = this.map._getChunk(x+i,y+j).biome;
    }
  }
  // next forces biome generation in all surrounding squares
  // later I'll use it to bleed biomes
  
  this.tiles= [[],[]];
  for(var x=0;x<this.size;x++){
    this.tiles[x]=[];
    for(var y=0;y<this.size;y++){
      this.tiles[x][y] = new Tile(x,y,next);
    }
  }
}
  
