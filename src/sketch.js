
let width = 600;
let height = 600;
let zoomFactor = 100;

function setup() {
    createCanvas(width, height);
    background(200);
    noLoop();
    frameRate(10);
    
    slider = createSlider(0, 3000);
    slider.position(10, 700);
    slider.size(500);
    slider.input(updateSeed);
    // noiseSeed(100);
}


function draw() {
    // text('seed:', 550, 550);
    let waterColour = color(30, 176, 251), sandColour = color(255, 246, 193), grassColour = color(118, 239, 124), treeColour = color(22, 181, 141);
    // let seedVal = slider.value();
    // noiseSeed(seedVal);
    
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const noiseVal = noise(x / zoomFactor, y / zoomFactor); // generates a value between 0 - 1 with a zoomfactor that "narrows" where we are looking (closer pixels i guess is another way of describing)

            // console.log(noiseVal);
            
            // set(x, y, color(255 * noiseVal)); // multiplies the noise value by 255 to get grayscale colour and sets it at (x, y) pixel

            // now uses colour instead of grayscale, (better colour values from htmlcolorcodes.com)
            if (noiseVal < 0.4) {
                set(x, y, waterColour);

            } else if(noiseVal < 0.5) { 
                set(x, y, sandColour);

            } else if (noiseVal < 0.7) {
                set(x, y, grassColour);

            } else {
                set(x, y, treeColour);
                
            }

        }

    }

    updatePixels();

}

function updateSeed() {
    let seedVal = slider.value();
    noiseSeed(seedVal);
    updatePixels();
    // console.log(seedVal);
}

