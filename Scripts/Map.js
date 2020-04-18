function Map(){
  var chunk = 32;
  this.chunkSize = chunk;
  var cols = chunk;
  var rows = chunk;
  
  this.chunks = {};
  this._getChunk(0,0);
}

Map.prototype.drawTile = function (ctx,layer, col, row,ex,ey) {
  var x = ((col%this.chunkSize)+this.chunkSize)%this.chunkSize;
  var y = ((row%this.chunkSize)+this.chunkSize)%this.chunkSize;
  return this.getChunk(col,row).drawTile(ctx,layer,x,y,ex,ey);
};

Map.prototype.isSolidTileAtXY = function (col,row) {
  var x = Math.floor(((col%this.chunkSize)+this.chunkSize)%this.chunkSize);
  var y = Math.floor(((row%this.chunkSize)+this.chunkSize)%this.chunkSize);
  return this.getChunk(col,row).isSolidTileAtXY(x,y);
};

Map.prototype.getChunk = function(col,row){
  var x = Math.floor(col/this.chunkSize);
  var y = Math.floor(row/this.chunkSize);
  return this._getChunk(x,y);
}

Map.prototype._getChunk = function(x,y){
  var key = [x,y];
  if (this.chunks[key]==undefined){
    this.chunks[key] = new Chunk(this,this.chunkSize, x,y);
  }
  return this.chunks[key];
}
