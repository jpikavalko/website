window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        centerX = width / 2,
        centerY = height / 2,
        radiusX = 200,
        radiusY = 200,
        angleX = 1,
        angleY = 1,
        speedX = .2,
        speedY = .1,
        x, y;

    render();

    function render()
    {
        //context.clearRect(0, 0, width, height);
        x = centerX + Math.cos(angleX) * radiusX;
        y = centerY + Math.sin(angleY) * radiusY;

        context.beginPath();
        context.arc(centerX, centerY, 10, 0, Math.PI * 2, false);
        context.arc(x, y, 5, 0, Math.PI*2, false);
        context.fill();

        angleX += speedX *0.5;
        angleY += speedY *0.5;
        requestAnimationFrame(render);
    }
};