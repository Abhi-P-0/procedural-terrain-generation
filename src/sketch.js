
let width = 600;
let height = 600;
let zoomFactor = 100;

function setup() {
    createCanvas(width, height);
    background(200);
    noLoop();
    frameRate(10);
}


function draw() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const noiseVal = noise(x / zoomFactor, y / zoomFactor); // generates a value between 0 - 1 with a zoomfactor that "narrows" where we are looking (closer pixels i guess is another way of describing)

            // console.log(noiseVal);
            
            set(x, y, color(255 * noiseVal)); // multiplies the noise value by 255 to get grayscale colour and sets it at (x, y) pixel

        }

    }

    updatePixels();

}

