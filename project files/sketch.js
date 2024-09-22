let myBuffer;   //variable representing the current framebuffer
let fade1 = 0;  //variable representing the color to assign to rectangles during the fade in animation

//setup function, called once on page load
function setup() {
  //create p5 canvas
  createCanvas(windowWidth,windowHeight, WEBGL);
  
  //set attribute for antialiasing
  setAttributes('antialias', true);
  
  //cap framerate to 60
  frameRate(60);
  
  //create object for our framebuffer
  myBuffer = createFramebuffer();
  
  //description of the p5js content for screen readers
  describe('A multicolor sphere on a white surface. The image grows larger or smaller when the user moves the mouse, revealing a gray background.');
}

//function to dynamically resize the p5 canvas if the browser window size is changed
function windowResized() {
  //resize canvas based on window width and height
  resizeCanvas(windowWidth, windowHeight);
  
  //resize framebuffer based on window width and height
  myBuffer.resize(windowWidth, windowHeight);
}

//draw function, called every frame
function draw() {
  //variables for rectangle animation
  var bsizex = 3;         //box x size multiplier
  var bsizey = 20;        //box y size multiplier
  var b1x = -50;          //box vertex 1 x
  var b1y = -10;          //box vertex 1 y
  var b2x = -50;          //box vertex 2 x
  var b2y = 10;           //box vertex 2 y
  var b3x = -39;          //box vertex 3 x
  var b3y = 10;           //box vertex 3 y
  var b4x = -39;          //box vertex 4 x
  var b4y = -10;          //box vertex 4 y
  
  //variables for circle grid animation
  var tempmx = mouseX;    //temp mouse x. used for lerp transforms
  var tempmy = mouseY;    //temp mouse y. used for lerp transforms

  //begin filling buffer
  myBuffer.begin();
  
  //set background color to #000000
  background(0);
  
  //nested forloops creating a grid of circles based on the browser window width and height, with coordinates normalized to the top left corner
  for( var x = 0 - (windowWidth/2); x < windowWidth; x+=(windowWidth/2)/10) {
    for (var y = 0 - (windowHeight/2); y < windowHeight; y += windowHeight/10) {
      
      //dynamically transform circle radius based on how close the mouse is to its position
      var z =  20 - 4 * log(.06 / 1 * dist( x, y, lerp(tempmx, mouseX, .4)-(windowWidth/2), lerp(tempmy, mouseY, .4)-(windowHeight/2) ) ) ;
      
      //draw circle
      circle( x, y, z);
      
      //fill temp variables for lerp transforms
      tempmx = mouseX;
      tempmy = mouseY;
    }
  }

  //for loop for creating and animating 10 rectangles at the center of the canvas, animated on an offset sin wave
  for (var i = 0; i < 10; i++){
    
    //fade in the color for the boxes upon page load
    fill(fade1);
    
    //set no outline for rectangles
    noStroke();
    
    //draw quad based on vertex points, offsetting x per position in for loop
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
  
  //if color fade from black (0) to white (255) is not complete, increment fade color up .5
  if(fade1<=255){
    fade1+=.5;
  }
 }
  
  //finish filling framebuffer
  myBuffer.end();

  // Display the p5.Framebuffer object.
  image(myBuffer, 0-(windowWidth/2), 0-(windowHeight/2));
}
