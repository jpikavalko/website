window.onload = function()
{
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

        var colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
        'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
        'silver', 'teal', 'white', 'yellow'];
        

        

    for (var i = 0; i < 20; i += 1){
        // Begin path
        context.beginPath();

        // Save x and y for drawing the last stroke
        var x = Math.random() * width;
        var y = Math.random() * height;

        // Option A: Randomize number for color randomization
        // var a = Math.floor((Math.random() * colors.length));

        // Option B: Randomize number for color randomization
        var rgb = [];
        for (var ii = 0; ii < 3; ii++){
            rgb.push(Math.floor(Math.random() * 255));
        }

        // First point
        context.moveTo(x,y);
        context.lineTo(Math.random() * width, Math.random() * height);
        context.lineTo(Math.random() * width, Math.random() * height);
        // Last point (= first point coordinates)
        context.lineTo(x, y);

        // Select color for triangle and fill it
        context.fillStyle = 'rgb('+ rgb.join(',') +')'; // Option A: colors[a];
        context.fill();

        // Draw outlines
        context.stroke();
    }
}