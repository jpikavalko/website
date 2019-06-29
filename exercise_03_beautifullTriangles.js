window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var triangleCount = 0;

    var triangleSize = 50;
    var halfSize = triangleSize / 2;

    var triangles = [];
    var Ax, Ay, Bx, By, Cx, Cy, Dx, Dy,
        aRadius, bRadius, cRadius,area,
        aAngle, bAngle, cAngle,
        ColorR, ColorG, ColorB, ColorA,
        area, rotationSpeed, fallingSpeed;

    setInterval(CreateTriangle, 50);
    
    UpdateTriangles();

    function CreateTriangle()
    {
        triangleCount++;

        // Calculate points ABC
        Ax = Math.random()*width;
        Ay = Math.random()*-100 -triangleSize;
        Bx = Ax + Math.random()*-triangleSize+halfSize; 
        By = Ay + Math.random()*triangleSize-halfSize; 
        Cx = Ax + Math.random()*triangleSize-halfSize; 
        Cy = Ay + Math.random()*triangleSize-halfSize; 
        
        // Calculate middle point (= center of gravity)
        Dx = GetCenterOfGravity(Ax, Bx, Cx);
        Dy = GetCenterOfGravity(Ay, By, Cy);
        
        // Calculate distance between middlepoint and points ABC
        aRadius = CalculateDistanceOf(Dx, Dy, Ax, Ay);
        bRadius = CalculateDistanceOf(Dx, Dy, Bx, By);
        cRadius = CalculateDistanceOf(Dx, Dy, Cx, Cy);

        // Calculate Angles
        aAngle = GetPointAngle(Ax, Ay, Dx, Dy);
        bAngle = GetPointAngle(Bx, By, Dx, Dy);
        cAngle = GetPointAngle(Cx, Cy, Dx, Dy);

        //0 , 55, 255
        //255, 0 , 255
        ColorR = Math.floor((Ax / width) *255);
        ColorG = Math.floor((Math.random()*75));
        ColorB = Math.floor((Math.random()*25 + 230));

        // Calculate triangle area and rotation- and falling speeds
        area = AreaOfTriangle(Ax, Ay, Bx, By, Cx, Cy);
        rotationSpeed = area / 20000 * (Math.random() - 0.5) ;
        fallingSpeed = area / 1000;

        // Assings variables to object and add said object to triangles array
        var triangle = {oAx: Ax, oAy:Ay, oBx:Bx, oBy:By, oCx:Cx, oCy:Cy, oDx:Dx, oDy:Dy, oaAngle: aAngle, obAngle: bAngle, ocAngle:cAngle, oaRadius:aRadius, obRadius:bRadius, ocRadius:cRadius, oArea:area, oRotSpeed:rotationSpeed, oFallSpeed: fallingSpeed, oColorR:ColorR, oColorG:ColorG, oColorB:ColorB, oColorA:ColorA};
        triangles.push(triangle);
    }

    // Update Triangles position and color
    function UpdateTriangles()
    {
        context.clearRect(0, 0, width, height);
        for (var i = 0; i < triangleCount; i++)
        {
            //center  angle              radius
            triangles[i].oAx = triangles[i].oDx + Math.cos(triangles[i].oaAngle) * triangles[i].oaRadius;
            triangles[i].oAy = triangles[i].oDy + Math.sin(triangles[i].oaAngle) * triangles[i].oaRadius;
            triangles[i].oBx = triangles[i].oDx + Math.cos(triangles[i].obAngle) * triangles[i].obRadius;
            triangles[i].oBy = triangles[i].oDy + Math.sin(triangles[i].obAngle) * triangles[i].obRadius;
            triangles[i].oCx = triangles[i].oDx + Math.cos(triangles[i].ocAngle) * triangles[i].ocRadius;
            triangles[i].oCy = triangles[i].oDy + Math.sin(triangles[i].ocAngle) * triangles[i].ocRadius;

            //console.log("(" + triangles[i].oColorR + ", " + triangles[i].oColorG + ", " + triangles[i].oColorB + ")");
            // Draw triangle   
            context.beginPath();
            context.moveTo(triangles[i].oAx, triangles[i].oAy);
            context.lineTo(triangles[i].oBx, triangles[i].oBy);
            context.lineTo(triangles[i].oCx, triangles[i].oCy);
            context.lineTo(triangles[i].oAx, triangles[i].oAy);
            context.fillStyle = 'rgb(' + triangles[i].oColorR + ',' + triangles[i].oColorG + ',' + triangles[i].oColorB + ')';
            context.fill();
            context.stroke();

            // Increment angles
            triangles[i].oaAngle += triangles[i].oRotSpeed;
            triangles[i].obAngle += triangles[i].oRotSpeed;
            triangles[i].ocAngle += triangles[i].oRotSpeed;

            triangles[i].oDy += triangles[i].oFallSpeed;
            triangles[i].oColorR += 0.01;
            triangles[i].oColorG += 0.01;
            triangles[i].oColorB += 0.01;
        }
        
        // Update frames
        requestAnimationFrame(UpdateTriangles);
    }

    // Calculate Area of Triangle (in pixels);
    function AreaOfTriangle(x1, y1, x2, y2, x3, y3){
        aSide = CalculateDistanceOf(x1, y1, x2, y2);
        bSide = CalculateDistanceOf(x1, y1, x3, y3);
        cSide = CalculateDistanceOf(x2, y2, x3, y3);
        var s = 0.5 * (aSide + bSide + cSide);
        var A = Math.sqrt((s*(s-aSide))*(s-bSide)*(s-cSide));
        return A;
    }

    // Calculate distance between two points
    function CalculateDistanceOf(x1, y1, x2, y2)
    {
        //sqrt( (x2 - x1)^2 + (y2 - y1)^2 )
        var distX = (x2 - x1) * (x2 - x1);
        var distY = (y2 - y1) * (y2 - y1);
        var Distance = Math.sqrt(distX + distY);
        return Distance;
    }

    // Calculate center of gravity
    function GetCenterOfGravity(xy1,xy2,xy3)
    {
        return (xy1 + xy2 + xy3) / 3;
    }

    // Calculate angle of given point
    function GetPointAngle(cx, cy, ex, ey) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        //theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

    // Normalize values
    function normalize(val, min, max){
        // Shift to positive to avoid issues when crossing the 0 line
        if(min < 0){
          max += 0 - min;
          val += 0 - min;
          min = 0;
        }
        // Shift values from 0 - max
        val = val - min;
        max = max - min;
        return Math.max(0, Math.min(1, val / max));
      }

    // Draws helper strokes. Remove when finished
    function DrawHelperStrokes(){
        context.strokeStyle = 'green'
        context.beginPath();
        context.arc(Dx, Dy, 5, 0, Math.PI*2, false);
        context.stroke();

        context.beginPath();
        context.moveTo(Ax, Ay);
        context.lineTo(Dx-(Ax-Dx)*0.6, Dy-(Ay-Dy)*0.6);
        context.stroke();

        context.beginPath();
        context.moveTo(Bx, By);
        context.lineTo(Dx-(Bx-Dx)*0.6, Dy-(By-Dy)*0.6);
        context.stroke();

        context.beginPath();
        context.moveTo(Cx, Cy);
        context.lineTo(Dx-(Cx-Dx)*0.6, Dy-(Cy-Dy)*0.6);
        context.stroke();
        context.strokeStyle = 'black'
    }
}
