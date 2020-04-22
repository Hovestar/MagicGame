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
   var margin = 10;
   this.ctx.font = height+"px Arial";
   numLines = this.wrapText(leftSide+margin,topSide+height+margin,width-2*margin,height*1.2,false);
   
   this.ctx.fillStyle = "#FFF";
   //this.ctx.beginPath();
   this.ctx.lineWidth = "6";
   this.ctx.rect(leftSide,topSide, width, numLines+2*margin);
   this.ctx.fill();

   this.ctx.fillStyle = "#000";
   this.wrapText(leftSide+margin,topSide+height+margin,width-2*margin,height*1.2,true);
   this.ctx.font = oldFont;
};

Window.prototype.wrapText = function(x, y, maxWidth, lineHeight,write) {
   var words = this.text.split(' ');
   var line = '';
   var startBuffer = y-lineHeight; // rather meaningless, but it makes the size calculation better. 

   for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
         if(write){
            this.ctx.fillText(line, x, y);
         }
         line = words[n] + ' ';
         y += lineHeight;
      }
      else {
         line = testLine;
      }
   }
   if (write){
      this.ctx.fillText(line, x, y);
   }
   return y-startBuffer;
}