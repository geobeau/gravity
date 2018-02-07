tickDuration = 1000 / 60

Matter.use('matter-attractors');

var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Vector = Matter.Vector,
Events = Matter.Events,
Runner = Matter.Runner,

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

var runner = Runner.create({
    delta: tickDuration,
    isFixed: true,
    enabled: true
});

Runner.run(runner, engine);
Render.run(render);

function startRocket(){
  rocketEnginePush(0.06);
}

function turnRocket(){
  rocketRCSPush(0.025);
}

function shootRocket(){
  rocketRCSPush(-0.02);
  rocketEnginePush(0.09);
}
//
scheduleActions(1000,{"actionType":"burn","options":{"burnTime":9000,"impulsion":50}})
scheduleActions(4000,{"actionType":"rcs","options":{"burnTime":2000,"impulsion":80}})
scheduleActions(8000,{"actionType":"rcs","options":{"burnTime":2000,"impulsion":-80}})

Events.on(runner, "beforeTick", runScheduler)
