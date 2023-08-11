// Create 80x80 grid on the canvas
// Canvas is 800x800 px, so each box on grid is 10x10px
// Randomly populate 20 of those squares with randomly generated colors
// Create a gradient from one colored square to the next
// Create a gradient towards black at the walls of the grid

const canvas = document.querySelector("#canvas");

function convertToHex(color) {
    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

function calculatePointColor(points, colors) {
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;

    for (let i = 0; i < points.length; i++) {
        totalR += points[i].val * colors[i].r;
        totalG += points[i].val * colors[i].g;
        totalB += points[i].val * colors[i].b;
    }

    return { r: Math.floor(totalR), g: Math.floor(totalG), b: Math.floor(totalB) };
}

function findHighestPercent(percents) {
    let highestPercent = percents[0].val;

    for (let i = 0; i < percents.length; i++) {
        if (highestPercent < percents[i].val) {
            highestPercent = percents[i].val;
        }
    }

    return highestPercent;
}

const setup = {
    generateStartingColors: function () {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(_p => {
            return {
                r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
            };
        });
    },

    generateStartingPoints: function () {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(_p => {
            return {
                x: Math.floor(Math.random() * 80),
                y: Math.floor(Math.random() * 80),
            };
        });
    }
}

const canvasUtils = {
    setPoint: function (point, color) {
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(
            point.x * 10, 
            point.y * 10,
            10,
            10,
        );

        ctx.fillStyle = convertToHex(color);
        ctx.fill();
    },

    calculateDistance: function(point1, point2) {
        return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
    }
}

// Loop over all the squares in the grid
function display() {
    let ogColors = setup.generateStartingColors();
    let points = setup.generateStartingPoints();
    
    // Setup original points
    for (let i = 0; i < 20; i++) {
        canvasUtils.setPoint(points[i], ogColors[i]);
    }
    
    let colors = [{ r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }].concat(ogColors);
    for (let x = 0; x < 80; x++) {

        for (let y = 0; y < 80; y++) {
            // 90 - 96
            // Determine the closest original point or border by calculating distances to all of them and then choosing the smallest
            // First 4 points are hardcoded as the walls of the grid
            let distances = [
                { x: -1, y: y }, { x: x, y: -1 }, 
                { x: 81, y: y }, { x: x, y: 81 },
            ].concat(points).map(p => canvasUtils.calculateDistance(p, { x, y }));

            let maxDistance = Math.max(...distances);
            let relativeDistances = distances.map(distance => (maxDistance - distance) / maxDistance);
            
            let relativeSum = relativeDistances.reduce((s, a) => s + a, 0);
            let percents = relativeDistances.map((distance, i) => { return { val: distance / relativeSum, colorIndex: i } });

            // Filter to the relevant colors
            let highestPercent = findHighestPercent(percents);
            let relevancyCutoff = highestPercent - 0.025;

            let filteredPercents = percents.filter(percent => percent.val > relevancyCutoff);

            let percentSum = filteredPercents.reduce((s, a) => s + a.val, 0);
            let weights = filteredPercents.map(percent => { return { val: percent.val / percentSum, colorIndex: percent.colorIndex } });

            let relevantColors = [];
            for (let i = 0; i < weights.length; i++) {
                relevantColors.push(colors[weights[i].colorIndex]);
            }

            let pointColor = calculatePointColor(weights, relevantColors);

            canvasUtils.setPoint({x, y}, pointColor);
        }
    }
}

function download() {
    const link = document.createElement("a");
    
    link.download = "TheWindow.png";
    link.href = canvas.toDataURL();
    
    link.click();

    link.delete;
}

display();