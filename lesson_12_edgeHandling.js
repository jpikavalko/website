window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
    
    var p = particle.create(width / 2, height / 2, 3, Math.random() * Math.PI * 2, 0.1);

    p.radius = 20;
    p.bounce = -0.5;

	update();

    function update()
    {
        context.clearRect(0, 0, width, height);
        
        p.update();

		context.beginPath();
		context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
        context.fill();

        // Edge handling technique
        // conciderRadius();
        // removeDeadParticles();
        bounce();

        requestAnimationFrame(update);
    }
    
    function bounce(){
        if (p.position.getX() + p.radius > width){
            p.position.setX(width - p.radius);
            p.velocity.setX(p.velocity.getX() * p.bounce);
        }
        if (p.position.getX() - p.radius < 0){
            p.position.setX(p.radius);
            p.velocity.setX(p.velocity.getX() * p.bounce);
        }
        if (p.position.getY() + p.radius > height){
            p.position.setY(height - p.radius);
            p.velocity.setY(p.velocity.getY() * p.bounce);
        }
        if (p.position.getY() - p.radius < 0){
            p.position.setY(p.radius);
            p.velocity.setY(p.velocity.getY() * p.bounce);
        }
    }

    function removeDeadParticles(){
        // for (var i = particles.length -1; i >= 0; i -= 1){
        //     var p = particles[i];
            if (p.position.getX() - p.radius > width ||
            p.position.getX() + p.radius< 0 ||
            p.position.getY() - p.radius > height ||
            p.position.getY() + p.radius < 0){
                particles.splice(i, 1);
            }
        // }
    }


    function conciderRadius(){
        if(p.position.getX() - p.radius > width){
            p.position.setX(-p.radius);
        }
        if (p.position.getX() + p.radius< 0){
            p.position.setX(width + p.radius);
        }
        if(p.position.getY() - p.radius > height){
            p.position.setY(-p.radius);
        }
        if (p.position.getY() + p.radius < 0){
            p.position.setY(height + p.radius);
        }
    }
};