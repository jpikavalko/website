window.onload = function()
{
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var triangleCount = 2500;

    var coords = [];
    for (var i = 0; i < triangleCount; i += 1)
    {
        // Point coordinates
        var x0 = Math.random() * width,
            y0 = Math.random() * height,
            x1 = (Math.random() * 50) - 25,
            x2 = (Math.random() * 50) - 25,
            y1 = (Math.random() * 50) - 25,
            y2 = (Math.random() * 50) - 25;

        coords.push(x0);
        coords.push(y0);
        coords.push(x1);
        coords.push(y1);
        coords.push(x2);
        coords.push(y2);

        // Randomize number for color randomization
        var rgb = [];
        var rgbR = Math.floor((x0 / width) * 255),
            rgbG = Math.floor((y0 / height) * 255),
            rgbB = Math.floor(Math.random() * 255);

        rgb.push(rgbR);
        rgb.push(rgbG);
        rgb.push(rgbB);

        // Begin path
        context.beginPath();

        // Three points for triangle + the last line stroke
        context.moveTo(x0,y0);
        context.lineTo(x0 + x1, y0 + y1);
        context.lineTo(x0 + x2, y0 + y2);
        context.lineTo(x0, y0);

        // Select color for triangle and fill it
        context.fillStyle = 'rgb('+ rgb.join(',') +')'; 
        context.fill();

        // Draw outlines
        context.stroke();
    }

    console.log(coords[200]);
}