function createSolarSystem() {
  ground = Bodies.circle(400, 10600, earthSize, {
    // isStatic: true,
    plugin: {
      attractors: [
        MatterAttractors.Attractors.gravity
      ]
    },
    render: {
      fillStyle: earthColor
    }
  }, maxSides=1000);

  constraint = Matter.Constraint.create({
    pointA: { x: 400, y: 10600 },
    bodyB: ground,
    length: 0
  });

  World.add(engine.world, ground);
  World.add(engine.world, constraint);


  Matter.Body.setMass(ground, 7000000)


}
