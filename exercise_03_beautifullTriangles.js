window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var triangles = [];
    var Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, Radius, Area, ColorR, ColorG, ColorB, ColorA;
    var angle = 0;

    CreateTriangle();
    UpdateTriangles();

    function CreateTriangle()
    {
        // Calculate variables
        Ax = width/2 - 50;
        Ay = height/2 - 50;
        Bx = width/2 + 50;
        By = height/2 - 50;
        Cx = width/2;
        Cy = height/2 + 50;
        Dx = 0;
        Dy = 0;

        // Create points (not needed here actually)
        context.beginPath();
        context.moveTo(Ax, Ay);
        context.lineTo(Bx, By);
        context.lineTo(Cx, Cy);
        context.lineTo(Ax, Ay);
        context.stroke();
    }

    // Update Triangles position and color
    function UpdateTriangles()
    {
        Ax = width/2 + Math.cos(angle) * 20;
        Ay = height/2 + Math.sin(angle) * 60;
        Bx = width/2 + Math.cos(angle+20) * 60;
        By = height/2 + Math.sin(angle+20) * 180;
        Cx = width/2 + Math.cos(angle+40) * 40;
        Cy = height/2 + Math.sin(angle+40) * 120;

        context.clearRect(0, 1, width, height);
        context.beginPath();
        context.moveTo(Ax, Ay);
        context.lineTo(Bx, By);
        context.lineTo(Cx, Cy);
        context.lineTo(Ax, Ay);
        context.stroke();

        angle += 0.01;

        requestAnimationFrame(UpdateTriangles);
    }

    function CalculateMiddlePointOf()
    {

    }
}
