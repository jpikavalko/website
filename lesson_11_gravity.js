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
        
    var minRange = 150,
        maxRange = 500 - minRange,
        initRange;

    var planets = [],
        planetCount = 1000,
        planetColors = [],
        cR = 50,
        cB = 100,
        cG = 200,
        cA = 0.1;

    for (var i = 0; i < planetCount; i++){
        initRange = Math.random()*maxRange + minRange;
        var planet = particle.create(width / 2 + initRange, height / 2, 10, -Math.PI / 2);
        planets[i] = planet;
       
        // Math.random() * 255;
        cR = Math.random() * 255;
        cB = normalize(initRange, minRange, maxRange) * 255;
        cG = normalize(initRange, minRange, maxRange) * 255;
        cA = 1.0;
        var col = {colR: cR, colB: cB, colG: cG, colA: cA};
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
            context.fillStyle = "rgba(" + planetColors[i].colR + "," + planetColors[i].colB + "," + planetColors[i].colG + "," + planetColors[i].colA +")";
            context.arc(planets[i].position.getX(), planets[i].position.getY(), 5, 0, Math.PI * 2, false);
            context.fill();
            // pohdi, miten normalisoida minRange ja maxRange ja miten getLength liittyy näihin
            // mieti myös length * length
            planetColors[i].colA = normalize( planets[i].velocity.getLength(), 0, 20);
        }

		requestAnimationFrame(update);
    }

    function normalize(val, min, max)
    {
        var value = (val - min) / (max - min);
        return value;
    }
    // blue
    // 46, 18, 66
    // weird orange
    // 255, 166, 0

    // red 255, 0, 0, 100%
    // blc 255, 0, 0, 0%

    // ColorR = Math.floor((Ax / width) *255);
    //     ColorG = Math.floor((Math.random()*75));
    //     ColorB = Math.floor((Math.random()*25 + 230));



};

