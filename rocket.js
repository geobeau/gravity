function createRocket(){
  rocket = Bodies.rectangle(400, 579, 7, 40,{
    // isStatic: true,
    plugin: {
      attractors: [
        MatterAttractors.Attractors.gravity
      ]
    }
  });


  Matter.Body.setMass(rocket, 7)
  rocket.frictionAir=0
  World.add(engine.world, rocket);
}

function rocketEnginePush(force) {
  var pushVector={x: 0, y: 0-force};
  var rearPush=Vector.rotate(pushVector, rocket.angle);
  Matter.Body.applyForce( rocket, {x: rocket.position.x, y: rocket.position.y}, rearPush);
}

function rocketRCSPush(force) {
  var pushVector={x: 0, y: 0-force};
  var sidePush=Vector.perp(Vector.rotate(pushVector, rocket.angle));
  var rocketTopMiddle={x: (rocket.vertices[0].x+rocket.vertices[1].x)/2, y: (rocket.vertices[0].y+rocket.vertices[1].y)/2};
  Matter.Body.applyForce( rocket, rocketTopMiddle, sidePush);
}

function rotateRocket(force) {
  Matter.Body.setAngle(rocket, angle);
}
