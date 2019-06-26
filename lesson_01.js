window.onload = function()
{
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    //triangle;
    // context.beginPath();
    // context.moveTo(75, 50);
    // context.lineTo(100, 75);
    // context.lineTo(100, 25);
    // context.fill();
        
    for (var i = 0; i < 100; i += 1)
    {
        context.beginPath();
        context.moveTo(Math.random() * width, Math.random() * height);
        context.lineTo(Math.random() * width, Math.random() * height);
        context.stroke();
    }
}