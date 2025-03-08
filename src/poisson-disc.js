// radius : int -> represents the minimum distance we want between points.
// gridSize : 2D Vector / Array => represents the grid dimensions in which to generate points.
function PoissonDisc(radius, gridSize, maxTries = 20) {
    const x = gridSize[0];
    const y = gridSize[1];
    const outerCircle = radius * 2;

    const canvas = document.getElementById("myCanvas");
    canvas.width = x;
    canvas.height = y;
    const ctx = canvas.getContext("2d");


    const cellSize = radius/Math.sqrt(2); // Achieved via pythagorean theorem where: r^2 = cellsize^2 + cellsize^2
    const grid = [[Math.ceil(x/cellSize)], [Math.ceil(y/cellSize)]];

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
        drawPoint(ctx, spawnCenter[0], spawnCenter[1], "red"); 
        drawCircle(ctx, spawnCenter[0], spawnCenter[1], outerCircle);

        for(i = 0; i < maxTries; i++) {
            // Explanation 1)
            let angle = Math.random() * Math.PI*2;
            randomScaler = Math.random() * (outerCircle - radius) + radius;
            
            angleX = spawnCenter[0] + Math.cos(angle) * randomScaler;
            angleY = spawnCenter[1] + Math.sin(angle) * randomScaler;
            neighbourAccepted = false;

            const neighbourPoint = [angleX, angleY];
            console.log(neighbourPoint);
            drawPoint(ctx, neighbourPoint[0], neighbourPoint[1], "black");
            console.log(grid);

            if(isValid(neighbourPoint)) {
                points.push(neighbourPoint);
                spawnedPoints.push(neighbourPoint);
                grid[[neighbourPoint[0]/cellSize], [neighbourPoint[1]/cellSize]] = points.length;
                neighbourAccepted = true;
                break;
            }
        }

        if(!neighbourAccepted) {
            spawnedPoints.splice(spawnedPointIndex, 1);
        }

        return finalizedPoints;
    }
}


function isValid(neighbourPoint, gridSize, cellSize, finalizedPoints, spawnedPoints) {

}

function drawPoint(ctx, x, y, color = "black") {
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke(); 
    ctx.closePath();
}




