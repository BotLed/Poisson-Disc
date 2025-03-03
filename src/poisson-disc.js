
// radius : int -> represents the minimum distance we want between points.
// gridSize : 2D Vector / Array => represents the grid dimensions in which to generate points.
function PoissonDisc(radius, gridSize, maxTries = 20) {
    const x = gridSize[0];
    const y = gridSize[1];
    const outerCircle = radius * 2;

    const canvas = document.getElementById("myCanvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");


    const cellSize = radius/Math.sqrt(2); // Achieved via pythagorean theorem where: r^2 = cellsize^2 + cellsize^2
    const grid = [Math.ceil(x/cellSize), Math.ceil(y/cellSize)];

    const finalizedPoints = [];
    const spawnedPoints = [];


    const seedPoint = [x/2, y/2]; // Spawning initial point right in the center of the grid
    spawnedPoints.push(seedPoint); 
    finalizedPoints.push(seedPoint);
    while(spawnedPoints.length > 0) {
        // Generate a random index from which to begin generating points around
        // - On the first iteration, spawnedPoints has only 1 element, so Math.random() * 1 always returns 0
        spawnedPointIndex = Math.floor(Math.random() * spawnedPoints.length);
        
        // Retrieve the actual point at the index
        spawnCenter = spawnedPoints[spawnedPointIndex]; 
        console.log(spawnCenter);
        drawPoint(ctx, spawnCenter[0], spawnCenter[1]); 

        for(i = 0; i < maxTries; i++) {
            // Generates a random angle in radians at which to draw the point
            let angle = Math.random() * Math.PI*2;

            // We take cos: the horizontal distance, sin : the vertical distance of the angle and scale by the center point,
            // in order to get the position of the absolute point on the grid.
            angleX = spawnCenter[0] + Math.cos(angle)*radius;
            angleY = spawnCenter[1] + Math.sin(angle)*radius;

            const neighbourPoint = [angleX, angleY];
            drawPoint(ctx, neighbourPoint[0], neighbourPoint[1]);
            console.log("x: %d, y: %d", angleX, angleY);

            
        }

        return;

    }
}

function drawPoint(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}



