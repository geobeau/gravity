function createSolarSystem() {
  ground = Bodies.circle(400, 1600, 1000, {
    // isStatic: true,
    plugin: {
      attractors: [
        MatterAttractors.Attractors.gravity
      ]
    }
  });

  constraint = Matter.Constraint.create({
    pointA: { x: 400, y: 1600 },
    bodyB: ground,
    length: 0
  });

  World.add(engine.world, ground);
  World.add(engine.world, constraint);


  Matter.Body.setMass(ground, 70000)


}
