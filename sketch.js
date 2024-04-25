let serial;
let latestData = "waiting for data";
let data = []; //the list of data from arduino

let video;
let w = 640;
let h = 500;
let distance = 0;

let osc; //this is used to generate a sound frequency in p5

function setup() {
  createCanvas(w, h, WEBGL);
  video = createCapture(VIDEO);
  video.size(width,height);
  video.hide();
  noStroke()
}

function draw() {
  background(0);
  pointLight(255, 255, 255, width/2, height/2, 300)
  ambientLight(255)
  video.loadPixels();
  console.log (video.pixels.length,width*height*4);
  // console.log()
  
  let boxSize = int(map(distance, 0, 400, 12, 32));
  
  for (let y=0;y<video.height;y+=boxSize){
    for (let x=0; x<video.width; x+=boxSize){
      let index = (x +y*video.width)*4;
      let r = video.pixels[index];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      let a = video.pixels[index+3];
      let h = 1-r/255
      push()
      fill(r,g,b,a)
      translate(x-width/2,y-height/2,boxSize/2);
      rotate(h*TWO_PI)
      box(boxSize-2, boxSize-2, h*boxSize*20)
      pop()
    }
  }
}