let myBuffer;
let fade1 = 0;
function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  setAttributes('antialias', true);
  frameRate(60);
  myBuffer = createFramebuffer();
  describe('A gridlike pattern of circles that change in size with the mouse position, and a series of rectangles animated on a sin wave');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  myBuffer.resize(windowWidth, windowHeight);
}

function draw() {
  var bsizex = 3;
  var bsizey = 20;
  var b1x = -50;
  var b1y = -10;
  var b2x = -50;
  var b2y = 10;
  var b3x = -39;
  var b3y = 10;
  var b4x = -39;
  var b4y = -10;
  var tz = 0;
  var tempmx = mouseX;
  var tempmy = mouseY;

  myBuffer.begin();
  background(0);
  
  for( var x = 0 - (windowWidth/2); x < windowWidth; x+=(windowWidth/2)/10) {
    for (var y = 0 - (windowHeight/2); y < windowHeight; y += windowHeight/10) {
      var z =  20 - 4 * log(.06 / 1 * dist( x, y, lerp(tempmx, mouseX, .4)-(windowWidth/2), lerp(tempmy, mouseY, .4)-(windowHeight/2) ) ) ;
      circle( x, y, z);
      tempmx = mouseX;
      tempmy = mouseY;
    }
  }

 for (var i = 0; i < 10; i++){
   fill(fade1);
     noStroke();
  quad(
    bsizex * 1.5 * (b1x+i*10), 
    bsizey * b1y + (10*sin((millis()*.003+(i*.55)))),
    bsizex * 1.5 * (b2x+i*10), 
    bsizey * b2y +  (10*sin((millis()*.003+(i*.55)))),
    bsizex * 1.5 * (b3x+i*10), 
    bsizey * b3y + (10*sin((millis()*.003+(i*.55)))),
    bsizex * 1.5 * (b4x+i*10), 
    bsizey * b4y + (10*sin((millis()*.003+(i*.55))))
  );    
  if(fade1<=255){
    fade1+=.5;
  }
 }
  
  myBuffer.end();
  image(myBuffer, 0-(windowWidth/2), 0-(windowHeight/2));
}
