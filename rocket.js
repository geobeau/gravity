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
  rocket.torque = force;
}

function rotateRocket(force) {
  Matter.Body.setAngle(rocket, angle);
}
