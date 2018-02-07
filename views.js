function createView(){

  var viewportCentre = {
    x: render.options.width * 0.5,
    y: render.options.height * 0.5
  };

  // make the world bounds a little bigger than the render bounds
  world.bounds.min.x = -2500;
  world.bounds.min.y = -2500;
  world.bounds.max.x = 3500;
  world.bounds.max.y = 3500;

  // keep track of current bounds scale (view zoom)
  var boundsScaleTarget = 1,
  boundsScale = {
    x: 1,
    y: 1
  };

  // use the engine tick event to control our view
  Events.on(engine, 'beforeTick', function() {
    var world = engine.world,
    // mouse = mouseConstraint.mouse,
    translate;



    // get vector from mouse relative to centre of viewport
    var deltaCentre = Vector.sub(Vector.sub(rocket.position, render.bounds.min), viewportCentre)
    // var deltaCentre = Vector.sub(rocket.position, viewportCentre),
    centreDist = Vector.magnitude(deltaCentre);

    // translate the view if mouse has moved over 50px from the centre of viewport
    if (centreDist > 5) {
      // create a vector to translate the view, allowing the user to control view speed
      var direction = Vector.normalise(deltaCentre),
      speed = Math.min(10, Math.pow(centreDist - 5, 2) * 0.0005);

      translate = Vector.mult(direction, speed);

      // prevent the view moving outside the world bounds
      if (render.bounds.min.x + translate.x < world.bounds.min.x)
      translate.x = world.bounds.min.x - render.bounds.min.x;

      if (render.bounds.max.x + translate.x > world.bounds.max.x)
      translate.x = world.bounds.max.x - render.bounds.max.x;

      if (render.bounds.min.y + translate.y < world.bounds.min.y)
      translate.y = world.bounds.min.y - render.bounds.min.y;

      if (render.bounds.max.y + translate.y > world.bounds.max.y)
      translate.y = world.bounds.max.y - render.bounds.max.y;

      // move the view
      Bounds.translate(render.bounds, translate);
    }
  });
}

function createTrail(){
  var trail = [];
  Matter.Events.on(render, 'afterRender', function() {
    trail.unshift({
      position: Vector.clone(rocket.position),
      speed: rocket.speed
    });

    Render.startViewTransform(render);
    render.context.globalAlpha = 0.7;

    for (var i = 0; i < trail.length; i += 1) {
      var point = trail[i].position,
      speed = trail[i].speed;

      var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
      render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
      render.context.fillRect(point.x, point.y, 2, 2);
    }

    render.context.globalAlpha = 1;
    Render.endViewTransform(render);

    if (trail.length > 5000) {
      trail.pop();
    }
  });
}
