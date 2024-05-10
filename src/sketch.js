
let width = 600;
let height = 600;
let zoomFactor = 100;

function setup() {
    createCanvas(width, height);
    background(200);
    noLoop();
}


function draw() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const noiseVal = noise(x / zoomFactor, y / zoomFactor);
            
            set(x, y, color(255 * noiseVal));

        }

    }

    updatePixels();

}

