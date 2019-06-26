window.onload = function()
{
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var triangleCount = 2500;

    for (var i = 0; i < triangleCount; i += 1)
    {
        // Begin path
        context.beginPath();

        // Save x and y for drawing the last stroke
        var x = Math.random() * width;
        var y = Math.random() * height;

        // Randomize number for color randomization
        var rgb = [];
        rgb.push(Math.floor((x / width) * 255));
        rgb.push(Math.floor((y / height) * 255));
        rgb.push(Math.floor(Math.random() * 255));

        // First point
        context.moveTo(x,y);
        context.lineTo(x + (Math.random() * 50) - 25, y + (Math.random() * 50) - 25);
        context.lineTo(x + (Math.random() * 50) - 25, y + (Math.random() * 50) - 25);

        // Last point (= first point coordinates)
        context.lineTo(x, y);

        // Select color for triangle and fill it
        context.fillStyle = 'rgb('+ rgb.join(',') +')'; 
        context.fill();

        // Draw outlines
        context.stroke();
    }
}