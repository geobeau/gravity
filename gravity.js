Matter.use('matter-attractors');

var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Vector = Matter.Vector,
Events = Matter.Events,

Bounds = Matter.Bounds,

MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse;

var engine = Engine.create();
world = engine.world;
engine.world.gravity.y = 0;

var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    wireframes: false,
    hasBounds: true,
    showAngleIndicator: true
  }
});


createSolarSystem();
createRocket();
createTrail();
createView();

Engine.run(engine);
Render.run(render);

function startRocket(){
  Matter.Body.applyForce( rocket, {x: rocket.position.x, y: rocket.position.y}, {x: 0, y: -0.06});
}

function shootRocket(){
  Matter.Body.applyForce( rocket, {x: rocket.position.x, y: rocket.position.y}, {x: 0.1, y: 0});
}
//
setTimeout(startRocket,4000)
setTimeout(shootRocket,6000)
