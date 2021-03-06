window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var triangleCount = 0;
    var coords = [];
    var rgb = [];
    var speeds = [];
    var middlePoints = [];
    var triangleSize = 100;
    var halfSize = triangleSize / 2;
    
    // for (var omg = 0; omg < triangleCount; omg++){
    //     createTriangles();
    // }

    setInterval(createTriangles, 50);

    updateTriangles();

    function createTriangles() {
        triangleCount++;
        var speed = Math.random() + 0.05;
        speeds.push(speed);

        //Create Points
        var x0 = Math.random() * width,
            y0 = -100, 
            x1 = calculateCoordinatesBySpeed(speed),
            y1 = calculateCoordinatesBySpeed(speed),
            x2 = calculateCoordinatesBySpeed(speed),
            y2 = calculateCoordinatesBySpeed(speed);

        middlePoints.push((x0 + x1 + x2) / 3);
        middlePoints.push((y0 + y1 + y2) / 3);

        coords.push(x0);
        coords.push(y0);
        coords.push(x1);
        coords.push(y1);
        coords.push(x2);
        coords.push(y2);
        
        var rgbR = Math.floor((x0 / width) * 255),
            rgbG = Math.floor((y0 / height) * 255),
            rgbB = Math.floor(Math.random() * 50);

        rgb.push(rgbR);
        rgb.push(rgbG);
        rgb.push(rgbB);
        
        // Begin path
        context.beginPath();

        // Three points for triangle + the last line stroke
        context.moveTo(x0, y0);
        context.lineTo(x0 + x1, y0 + y1);
        context.lineTo(x0 + x2, y0 + y2);
        context.lineTo(x0, y0);

        // Select color for triangle and fill it
        context.fillStyle = 'rgb(' + rgbR + ',' + rgbG + ',' + rgbB + ')';
        context.fill();

        // Draw outlines
        context.stroke();
    }

    var i = 0;
    function updateTriangles() {

        context.clearRect(0, 0, width, height);
        i++;

        for (var iter = 0; iter < triangleCount; iter++) 
        {
            var x0 = coords[iter*6+0],
                y0 = coords[iter*6+1]+=speeds[iter],
                x1 = coords[iter*6+2],
                y1 = coords[iter*6+3],
                x2 = coords[iter*6+4],
                y2 = coords[iter*6+5];


            var rgbR = rgb[iter*3+0]+=speeds[iter]*0.2,
                rgbG = rgb[iter*3+1]+=speeds[iter]*0.2,
                rgbB = rgb[iter*3+2]+=speeds[iter]*0.2;

            // Begin path
            context.beginPath();

            // Three points for triangle + the last line stroke
            context.moveTo(x0, y0);
            context.lineTo(x0 + x1, y0 + y1);
            context.lineTo(x0 + x2, y0 + y2);
            context.lineTo(x0, y0);

            // Select color for triangle and fill it
            context.fillStyle = 'rgb(' + rgbR + ',' + rgbG + ',' + rgbB + ')';
            context.fill();

            // Draw outlines
            context.stroke();;
        }

        requestAnimationFrame(updateTriangles);
    }

    function calculateCoordinatesBySpeed(speedo){
        newSpeed = (Math.random() * triangleSize) - halfSize;
        return newSpeed *speedo + 0.6;
    }
}