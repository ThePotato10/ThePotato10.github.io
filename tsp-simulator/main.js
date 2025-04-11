const canvas = document.getElementById("map");

/**
 * DONT TOUCH
 * This code is magic leave it alone
**/

// Magic bullshit code copied from the internet to fix blurriness and size
let dpi = window.devicePixelRatio;

fitToContainer(canvas);
fix_dpi(canvas);

function fitToContainer(cnv) {
    // Make it visually fill the positioned parent
    cnv.style.width = '100%';
    cnv.style.height = '100%';
    // ...then set the internal size to match
    cnv.width = cnv.offsetWidth;
    cnv.height = cnv.offsetHeight;
}

function fix_dpi(cnv) {
    // get CSS height/width
    // the slice method gets rid of "px"
    let style_height = +getComputedStyle(cnv).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(cnv).getPropertyValue("width").slice(0, -2);

    // scale the canvas
    cnv.setAttribute('height', style_height * dpi);
    cnv.setAttribute('width', style_width * dpi);
}

// END magic bullshit code

const state = {
    points: [],
    mouseDown: false,
    startPoint: null,
    connectedPoints: [],
    heuristicConnectedPoints: [],
    score: 0,
    heuristicScore: 0
};

function generatePoints() {
    return Array.apply(null, Array(20)).map(_x => {
        return {
            x: Math.floor(Math.random() * (canvas.width - 20)) + 10,
            y: Math.floor(Math.random() * (canvas.height - 20)) + 10,
        };
    });
}

function drawPoint(x, y) {
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fillStyle = "#EA7179";
    ctx.fill();
    ctx.stroke();
}

function drawFirstPoint(p) {
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.arc(p.x, p.y, 8, 0, Math.PI * 2)
    ctx.fillStyle = "#5C946E";
    ctx.fill();
    ctx.stroke();
}

function drawLine(point1, point2) {
    let ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "#457B9D";
    ctx.lineWidth = 3;
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
}

function drawHeuristicLine(point1, point2) {
    let ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "#EFD6AC";
    ctx.lineWidth = 2;
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
}

function getDistance(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}

function getMousePos(cnv, evt) {
    let rect = cnv.getBoundingClientRect(), // abs. size of element
        scaleX = cnv.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = cnv.height / rect.height;  // relationship bitmap vs. element for y

    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

state.points = generatePoints();
state.points.forEach(p => drawPoint(p.x, p.y));
drawFirstPoint(state.points[0]);

function heuristic() {
    let curr = state.points[0];
    let left = [...state.points].slice(1);
    let next = findShortest(curr, left);

    function findShortest(p, remaining) {
        let distances = remaining.map(x => getDistance(p, x));
        return remaining[distances.indexOf(Math.min(...distances))];
    }

    while (left.length > 0) {
        state.heuristicConnectedPoints.push([curr, next]);
        state.heuristicScore += Math.floor(getDistance(curr, next));
        console.log(Math.floor(getDistance(curr, next)));

        curr = next;
        left = left.filter(i => i !== next);
        next = findShortest(curr, left);
    }

    state.heuristicConnectedPoints.push([curr, state.points[0]]);
    state.heuristicScore += Math.floor(getDistance(curr, state.points[0]));
}

heuristic();
state.heuristicConnectedPoints.forEach(h => drawHeuristicLine(h[0], h[1]));
document.getElementById("heuristic").textContent = `Next-Closest Heuristic: ` + state.heuristicScore;

canvas.addEventListener("mousedown", (event) => {
    let point;
    let mousePos = getMousePos(canvas, event);
    state.mouseDown = true;

    for (let i = 0; i < state.points.length; i++) {
        if (getDistance(state.points[i], mousePos) <= 8) {
            point = state.points[i];
        }
    }

    if (point) state.startPoint = point;
}, false);

canvas.addEventListener("mouseup", (event) => {
    let point;
    let mousePos = getMousePos(canvas, event);
    state.mouseDown = false;

    for (let i = 0; i < state.points.length; i++) {
        if (getDistance(state.points[i], mousePos) <= 8) {
            point = state.points[i];
        }
    }

    if (point) {
        console.log("added");
        drawLine(state.startPoint, point);
        state.connectedPoints.push([state.startPoint, point]);

        state.score += Math.floor(getDistance(state.startPoint, point));
        document.getElementById("score").textContent = `Score: ${state.score}`;
    }

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    state.points.forEach(p => drawPoint(p.x, p.y));
    drawFirstPoint(state.points[0]); // redraw points

    state.heuristicConnectedPoints.forEach(h => drawHeuristicLine(h[0], h[1]));
    state.connectedPoints.forEach(c => drawLine(c[0], c[1]));  // redraw lines
}, false);

canvas.addEventListener("mousemove", (event) => {
    if (state.mouseDown) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        state.points.forEach(p => drawPoint(p.x, p.y));
        drawFirstPoint(state.points[0]); // redraw points

        state.heuristicConnectedPoints.forEach(h => drawHeuristicLine(h[0], h[1]));
        state.connectedPoints.forEach(c => drawLine(c[0], c[1]));  // redraw lines

        drawLine(state.startPoint, getMousePos(canvas, event)); // draw line
    }
}, false);

function reset() {
    state.connectedPoints = [];
    state.score = 0;
    document.getElementById("score").textContent = `Score: ${state.score}`;

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    state.points.forEach(p => drawPoint(p.x, p.y));
    drawFirstPoint(state.points[0]); // redraw points

    state.heuristicConnectedPoints.forEach(h => drawHeuristicLine(h[0], h[1]));
    state.connectedPoints.forEach(c => drawLine(c[0], c[1]));  // redraw lines
}