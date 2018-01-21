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
