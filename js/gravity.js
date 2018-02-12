tickDuration = 1000 / 60

// Colors
spaceColor   = "#093651"
earthColor   = "#E7ECEF"
rocketColor  = "#A89B9D"


renderWidth  = document.documentElement.clientWidth-300,
renderHeight = document.documentElement.clientHeight-50,
earthSize    = 10000;

initMinimap()

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
  element: document.getElementById('gravity-render'),
  engine: engine,
  options: {
    width: renderWidth,
    height: renderHeight,
    wireframes: false,
    hasBounds: true,
    background: spaceColor
  }
});


createSolarSystem();
createRocket();
createTrail();
initView();

var runner = Runner.create({
    delta: tickDuration,
    isFixed: true,
    enabled: true
});

Runner.run(runner, engine);
Render.run(render);

Events.on(runner, "beforeTick", runScheduler)
Events.on(runner, "afterTick", updateStats)

scheduleActions(1000,{"actionType":"burn","options":{"burnTime":20000,"impulsion":60}})
scheduleActions(8000,{"actionType":"rcs","options":{"burnTime":2000,"impulsion":50}})
scheduleActions(15000,{"actionType":"rcs","options":{"burnTime":2000,"impulsion":-50}})
