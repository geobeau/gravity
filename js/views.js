function initView(){

  viewportCentre = {
    x: render.options.width * 0.5,
    y: render.options.height * 0.5
  };

  // make the world bounds a little bigger than the render bounds
  world.bounds.min.x = -20500;
  world.bounds.min.y = -20500;
  world.bounds.max.x = 21500;
  world.bounds.max.y = 21500;
}

function updateView(){
  var world = engine.world,
    translate;

  var deltaCentre = Vector.sub(Vector.sub(rocket.position, render.bounds.min), viewportCentre)

  centreDist = Vector.magnitude(deltaCentre);

  // translate the view if mouse has moved over 50px from the centre of viewport
  if (centreDist >= 0) {
    // create a vector to translate the view, allowing the user to control view speed
    var direction = Vector.normalise(deltaCentre);

    translate = Vector.mult(direction, centreDist);

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

      render.context.fillStyle = rocketColor;
      render.context.fillRect(point.x, point.y, 1, 1);
    }

    render.context.globalAlpha = 1;
    Render.endViewTransform(render);

    if (trail.length > 5000) {
      trail.pop();
    }
  });
}

function getRocketAngularAngle(){
  var refAngle = {x: 0, y: 1};
  return Vector.angle(refAngle,rocket.velocity)
}

function updateStats(){
  document.getElementById("rocket-speed").innerHTML = Math.floor(rocket.speed*100)*4;
  document.getElementById("rocket-angular-speed").innerHTML = Math.floor(rocket.angularSpeed*1000);
  document.getElementById("rocket-angle").innerHTML = Math.round(rocket.angle * 180 / Math.PI);
  document.getElementById("rocket-velocity-angle").innerHTML = Math.round(getRocketAngularAngle() * 180 / Math.PI)+90;
  document.getElementById("rocket-height").innerHTML = Math.floor(Vector.magnitude(Vector.sub(rocket.position, ground.position))) - earthSize;
  updateMinimap();
}

function initMinimap(){
  var ctx = document.getElementById('minimap').getContext('2d');
  ctx.fillStyle = spaceColor
  ctx.fillRect(0,0,150,150);
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#88f';
}

function updateMinimap(){
  var ctx = document.getElementById('minimap').getContext('2d');
  var previousCtx = document.getElementById('previous-minimap').getContext('2d');
  ctx.drawImage(document.getElementById('previous-minimap'), 0, 0);
  ctx.beginPath();
  var size = 150;
  var scale = size / (world.bounds.max.x - world.bounds.min.x);
  //draw dot for masses
  ctx.fillStyle = '#aaf';
  // for (var i = 1; i < mass.length; i++) {
  //   ctx.fillRect(mass[i].position.x * scale + xOff - size, mass[i].position.y * scale + yOff, 3, 3);
  // }
  // //draw player's dot
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect((rocket.position.x - world.bounds.min.x) * scale, (rocket.position.y - world.bounds.min.y) * scale, 1, 1);
  ctx.arc((ground.position.x - world.bounds.min.x) * scale, (ground.position.y - world.bounds.min.y) * scale, earthSize * scale, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#AAAAAA';
  ctx.fill();

  ctx.fillStyle = '#FF0000';
  previousCtx.drawImage(document.getElementById('minimap'), 0, 0); // Backup the image
  ctx.fillRect((rocket.position.x - world.bounds.min.x + 3) * scale, (rocket.position.y - world.bounds.min.y + 3) * scale, 3, 3);

}
