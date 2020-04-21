function Window(ctx){
   this.ctx = ctx;
   this.text = "";
}

Window.prototype.setCtx = function(ctx){
   this.ctx = ctx;
};

Window.prototype.write = function(text){
   this.text = text.toString();
};

Window.prototype.append = function(text){
   this.text += text;
};

Window.prototype.update = function (delta) {
};


Window.prototype.render = function(){
   var height = 60;
   var oldFont = this.ctx.font;
   var numLines;
   var leftSide = 500;
   var topSide = 250;
   var width = 1000;
   var margin = 0;
   this.ctx.font = height+"px Arial";
   this.ctx.fillStyle = "#000";
   overlay.write(topSide+" - "); // Cause I want to know 
   numLines = this.wrapText(leftSide+margin,topSide+margin,width-margin-margin,height*1.2);
   this.ctx.font = oldFont;
   overlay.write(oldFont); // Cause I want to know 
   overlay.write(" - "+topSide); // Cause I want to know 
   
   this.ctx.fillStyle = "#FFF";
   this.ctx.beginPath();
   this.ctx.lineWidth = "6";
   this.ctx.rect(leftSide,topSide, width, numLines+margin+margin);
   this.ctx.fill();
};

Window.prototype.wrapText = function(x, y, maxWidth, lineHeight) {
   var words = this.text.split(' ');
   var line = '';
   var startBuffer = y-lineHeight; // rather meaningless, but it makes the size calculation better. 

   for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
         this.ctx.fillText(line, x, y);
         line = words[n] + ' ';
         y += lineHeight;
      }
      else {
         line = testLine;
      }
   }
   this.ctx.fillText(line, x, y);
   return y-startBuffer;
}