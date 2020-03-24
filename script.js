var count = 0;
var ball = new Image();
ball.src = './img/ball_blue.png';

var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Events = Matter.Events;

var engine = Engine.create();
var canvas = document.getElementById("canvas");    
var ctx = canvas.getContext("2d");

engine.timing.isFixed = false;


var render = Render.create({
  element: document.body,
  engine: engine,
  canvas: canvas,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
  }
});
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

Matter.Runner.tick(runner, engine, 1000/20);
runner.delta = 1000/20;

window.onload = (event) => {
  // console.log('page is fully loaded');
  keyboard.listen(document);
};

Events.on(engine, 'afterTick', function(event) {
  
  // console.log(count);
  // count += 1;

})
Events.on(engine, 'beforeUpdate', function(event) {
  // ctx.drawImage(ball, 30, 30);
  //todo
  if(keys){
    if(keys[38])Matter.Body.setVelocity(ballA, {x:0, y:-10});
    if(keys[40])Matter.Body.setVelocity(ballA, {x:0, y:10});
    if(keys[37])Matter.Body.setVelocity(ballA, {x:-10, y:0});
    if(keys[39])Matter.Body.setVelocity(ballA, {x:10, y:0});
  }
  
});

if(runner.enabled)console.log("running");

World.add(engine.world, [
  // walls
  // Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
  Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
  Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);

var boxA = Bodies.rectangle(400, 200, 120, 20, {
  isStatic: true,
  restitution: 0.9,
});
var ballA = Bodies.circle(370, 100, 20, {
  restitution: 0.9
});
var ballC = Bodies.circle(380, 200, 20, {
  // isStatic: true,
});

var ballB = Bodies.circle(460, 10, 20);
var ground = Bodies.rectangle(400, 580, 810, 60, { 
  isStatic: true,
  restitution: .9,
});

World.add(engine.world, [boxA, ballA, ballB, ballC, ground]);

Engine.run(engine);

Render.run(render);