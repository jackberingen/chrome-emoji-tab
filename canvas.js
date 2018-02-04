function rnd(min, max) {
    return Math.random() * (max - min) + min;
}

$("#search").keyup(function(event) {
	if (event.keyCode === 13) {
		if($("#search").val()){
			window.location.href = "http://google.com/search?q=" + $("#search").val();
		}
	}
});

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Svg = Matter.Svg;

// create an engine
var engine = Engine.create();

var container = document.getElementById('draw');

// create a renderer
var render = Render.create({
    element: container,
    engine: engine,
    options:{
    	height: container.clientHeight,
    	width: container.clientWidth,
    	wireframes: false,
    	background: 'transparent',
    	showAngleIndicator: false
    }
});

var mouseMain = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, { mouse: mouseMain, constraint: { stiffness: 0.5, render: { visible: false }}});
mouseMain.pixelRatio = window.devicePixelRatio;

World.add(engine.world, mouseConstraint);

var bodies = [];
for(var i = 0; i < 50; i++){
	var opts = {
		angle: rnd(-1.2, 1.2),
		render: {
			sprite: { 
				texture:"emoji/" + Math.floor(Math.random() * 100) + ".png",
				yScale: 0.5,
				xScale: 0.5
			}
		} 
	};
	var body = Bodies.circle(container.clientWidth / 2 + rnd(-50, 50), -300 + Math.floor(Math.random() * 20), 30.5, opts);
	Body.setAngularVelocity(body, 0.5);
	bodies.push(body);
}

var wallopts = {
	isStatic: true, 
	render: { 
		visible: true
	}
};

//Push walls
bodies.push(Bodies.rectangle(0, container.clientHeight + 10, container.clientWidth * 2, 20, wallopts));
bodies.push(Bodies.rectangle(-10, -200, 20, container.clientHeight * 4, wallopts));
bodies.push(Bodies.rectangle(container.clientHeight * 2 + 40, -200, 20, container.clientHeight * 4, wallopts));

// add all of the bodies to the world
World.add(engine.world, bodies);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);