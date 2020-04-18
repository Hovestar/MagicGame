function Tile(x,y,biomes){
  this.tsize = Tile.tsize;
  this.tileAtlas = Loader.getImage('tiles');
  // set space
  var myBiome = biomes[1][1];
  var rand = Math.random();
  var bottoms = {
    "grass":10,
    "dirt":10,
    "redCube":0,
    "brick":2,
    "slate":0,
    "hazard":0,
    "stone":0,
    "comb":0,
    "trippy":0,
    "marble":0,
    "bubble":1,
    "gravel":0,
    "blue":0,
    "wood1":0,
    "wood2":0,
    "wood3":0,
    "space":1,
  }
  var tops = {
    "tree": 5,
    "bush": 1,
    "":94,
  }
  if(myBiome == "fire"){
    bottoms["redCube"]=2;
    bottoms["grass"]=2;
    bottoms["slate"]=2;
    bottoms["hazard"]=2;
    bottoms["comb"]=2;
  }else if(myBiome == "earth"){
    bottoms["brick"]=2;
    bottoms["slate"]=2;
    bottoms["marble"]=2;
    bottoms["gravel"]=2;
    bottoms["space"]=2;
  }else if(myBiome == "water"){
    bottoms["blue"]=2;
    bottoms["trippy"]=2;
    bottoms["bubble"]=2;
  }else if(myBiome == "air"){
    bottoms["trippy"]=2;
    bottoms["space"]=5;
    bottoms["comb"]=2;
  }
  this.bottom = Object.assign({},Tile.nameMap[Tile.weightedChoice(bottoms)]);
  this.top = Object.assign({},Tile.nameMap[Tile.weightedChoice(tops)]);
  this.solid = this.top["solid"] || this.bottom["solid"];
  this.bottom["x"] += x%this.bottom["size"];
  this.bottom["y"] += y%this.bottom["size"];
}

Tile.tsize = 64;
Tile.prototype.draw = function(ctx,layer,x,y){
  if(layer==0){
    var draw = this.bottom;
  }else{
    var draw = this.top;
  }
  ctx.drawImage(
    this.tileAtlas, // image
    draw["x"] * this.tsize, // source x
    draw["y"] * this.tsize, // source y
    this.tsize, // source width
    this.tsize, // source height
    Math.round(x),  // target x
    Math.round(y), // target y
    this.tsize, // target width
    this.tsize // target height
  );
  if(draw["special"] != ""){
    draw = Tile.nameMap[draw["special"]];
    ctx.drawImage(
      this.tileAtlas, // image
      draw["x"] * this.tsize, // source x
      draw["y"] * this.tsize, // source y
      this.tsize, // source width
      this.tsize, // source height
      Math.round(x),  // target x
      Math.round(y)-this.tsize, // target y
      this.tsize, // target width
      this.tsize // target height
    );
  }
}

Tile.weightedChoice = function(options){
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
      return key;
    }
  }
}

Tile.nameMap = {
  "grass":  {"x":0,"y":0,"size":1,"solid":false,"special":""},
  "dirt":   {"x":1,"y":0,"size":1,"solid":false,"special":""},
  "tree":   {"x":2,"y":0,"size":1,"solid":true ,"special":"treeT"},
  "treeT":  {"x":3,"y":0,"size":1,"solid":false,"special":""},
  "bush":   {"x":4,"y":0,"size":1,"solid":true ,"special":""},
  "redCube":{"x":5,"y":0,"size":1,"solid":false,"special":""},
  "brick":  {"x":6,"y":0,"size":1,"solid":false,"special":""},
  "slate":  {"x":7,"y":0,"size":2,"solid":false,"special":""},
  "hazard": {"x":0,"y":1,"size":1,"solid":true ,"special":""},
  "stone":  {"x":1,"y":1,"size":1,"solid":false,"special":""},
  "comb":   {"x":2,"y":1,"size":1,"solid":false,"special":""},
  "trippy": {"x":3,"y":1,"size":1,"solid":false,"special":""},
  "marble": {"x":4,"y":1,"size":1,"solid":false,"special":""},
  "bubble": {"x":5,"y":1,"size":2,"solid":false,"special":""},
  "gravel": {"x":0,"y":2,"size":1,"solid":false,"special":""},
  "blue":   {"x":1,"y":2,"size":1,"solid":false,"special":""},
  "wood1":  {"x":2,"y":2,"size":1,"solid":false,"special":""},
  "wood2":  {"x":3,"y":2,"size":1,"solid":false,"special":""},
  "wood3":  {"x":4,"y":2,"size":1,"solid":false,"special":""},
  "space":  {"x":7,"y":2,"size":2,"solid":false,"special":""},
  "":       {"x":9,"y":0,"size":1,"solid":false,"special":""},
}
