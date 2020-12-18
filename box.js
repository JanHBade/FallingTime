// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
class Box
{
  constructor(x, y, w, h)
  {
    this.w = w;
    this.h = h;

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

    // Some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);

    // Some additional stuff
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-2, 2), random(1, 3)));
    this.body.SetAngularVelocity(random(-2, 2));
  }

  // This function removes the particle from the box2d world
  killBody()
  {
    world.DestroyBody(this.body);
  }

  // Is the particle ready for deletion?
  done()
  {
    // Let's find the screen position of the particle
    let pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (pos.y > height + this.w * this.h) {
      this.killBody();
      return true;
    }
    return false;
  }

  // Drawing the box
  display()
  {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(255);
    stroke(200);
    strokeWeight(2);    
    textSize(20);
    text('H',0,0,this.w,this.h);
    pop();
  }
}

class BoxText extends Box
{
  constructor(x, y, text, size, color)
  {
    if(1==text.lentgh)
      super(x,y,size/2,size);
    else
      super(x,y,size,size);

    this.size=size;
    this.text=text;
    this.color=color;
  }

  display()
  {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(this.color);
    textSize(this.size);
    text(this.text,0,0,this.w,this.h);
    pop();
  }
}

class BoxSec extends BoxText
{
  constructor(x, y, text)
  {
    let size=24;

    super(x,y,text,size,color(0,255,0));
  }
}

class BoxMin extends BoxText
{
  constructor(x, y, text)
  {
    let size=48;

    super(x,y,text,size,color(255,0,0));
  }
}

class BoxStu extends BoxText
{
  constructor(x, y, text)
  {
    let size=72;

    super(x,y,text,size,color(0,0,255));
  }
}