// Gravity
// gravity = (G * M) / r^2
// simple gravity for games:
// simple gravity = M / r^2
// Gravitational pull
// G = 6.672 * 10^-8 * cm^3 * g^-1 * s^-2 
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
    
    var sun = particle.create(width / 2, height / 2, 0, 0);
        

    var planets = [],
        planetCount = 1000,
        planetColors = [],
        cR = 50,
        cB = 100,
        cG = 200;

    for (var i = 0; i < planetCount; i++){
        var planet = particle.create(width / 2 + Math.random()*300 + 100, height / 2, 10, -Math.PI / 2);
        planets[i] = planet;
       
        cR = Math.random() * 255;
        cB = Math.random() * 255;
        cG = Math.random() * 255;
        var col = {colR: cR, colB: cB, colG: cG};
        planetColors[i] = col;
    }

    sun.mass = 20000;

	update();

    function update()
    {
		context.clearRect(0, 0, width, height);
        for (var i = 0; i < planetCount; i++){
            planets[i].gravitateTo(sun);
            planets[i].update();
        }
        context.beginPath();
        context.fillStyle = 'yellow';
        context.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2, false);
        context.fill();

        for (var i = 0; i < planetCount; i++){
            context.beginPath();
            context.fillStyle = 'rgb(' + planetColors[i].colR + ',' + planetColors[i].colB + ',' + planetColors[i].colG + ')';
            context.arc(planets[i].position.getX(), planets[i].position.getY(), 5, 0, Math.PI * 2, false);
            context.fill();
        }
		
		requestAnimationFrame(update);
    }
    
    // ColorR = Math.floor((Ax / width) *255);
    //     ColorG = Math.floor((Math.random()*75));
    //     ColorB = Math.floor((Math.random()*25 + 230));



};

