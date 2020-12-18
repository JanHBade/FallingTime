// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
let boundaries = [];
// A list for all of our rectangles
let boxes = [];

let timer = 0;
let OldSekunden = -1;
let OldMinuten = -1;

function setup()
{
  createCanvas(800, 800);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width / 4, height - 5, width / 2, 10));
  boundaries.push(new Boundary(3 * width / 4, height - 50, width / 2, 10));

  //let b = new Box(width / 2, 30);
  //boxes.push(b);
}

function draw()
{
  background(15);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  if (millis() >= 500+timer)
  {
    var d = new Date();
    var Sekunden = d.getSeconds();
    var Minuten = d.getMinutes();
    var Stunden = d.getHours();
    if(-1==OldSekunden)
    {
      let bm = new BoxMin(width / 2, 30, Minuten.toString());
      boxes.push(bm);
      let bs = new BoxStu(width / 2, 30, Stunden.toString());
      boxes.push(bs);
    }
    if (OldSekunden != Sekunden)
    {
        let b = new BoxSec(width / 2, 30, Sekunden.toString());
        boxes.push(b);
    }
    if(59==OldSekunden && 0==Sekunden)
    {        
        let b = new BoxMin(width / 2, 30, Minuten.toString());
        boxes.push(b);
    }
    if(59==OldMinuten && 0==Minuten)
    {        
        let b = new BoxStu(width / 2, 30, Stunden.toString());
        boxes.push(b);
    }
    OldMinuten=Minuten;
    OldSekunden=Sekunden;
    timer = millis();
  }

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].display();
    if (boxes[i].done()) {
      boxes.splice(i, 1);
    }
  }
}