function Overlay(){
  this.text = "";
};

Overlay.prototype.setCtx = function(ctx){
  this.ctx = ctx;
  ctx.font = "30px Arial";
}

Overlay.prototype.write = function(text,left=true,top=false){
  this.text += text;
}

Overlay.prototype.render = function(){
  this.ctx.strokeText(this.text,10,25);
  this.text = "";
}
