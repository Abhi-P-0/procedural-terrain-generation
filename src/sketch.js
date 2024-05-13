
let width = 600;
let height = 600;
let zoomFactor = 100;
let WaterTerrain;
let SandTerrain;
let GrassTerrain;
let TreeTerain;
let MountainTerrain;

function setup() {
    createCanvas(width, height);
    background(200);
    noLoop();
    frameRate(10);
    
    slider = createSlider(0, 3000);
    slider.position(10, 700);
    slider.size(500);
    slider.input(updateSeed);
    noiseSeed(100);
    noiseDetail(10, 0.5);

    WaterTerrain = new TerrainType(0, 0.4, color(30, 176, 251), color(40, 255, 255), 0);
    SandTerrain = new TerrainType(0.4, 0.5, color(215, 192, 158), color(255, 246, 193), 0.3);
    GrassTerrain = new TerrainType(0.5, 0.6, color(2, 166, 155), color(118, 239, 124), 0);
    TreeTerain = new TerrainType(0.6, 0.75, color(22, 181, 141), color(10, 145, 113), -0.5);
    MountainTerrain = new TerrainType(0.75, 1, color('#c1c5d6'), color('#ebecf0'), 0);
    
}


function draw() {
    // text('seed:', 550, 550);
    // let waterColour = color(30, 176, 251), sandColour = color(255, 246, 193), grassColour = color(118, 239, 124), treeColour = color(22, 181, 141), mountainColour = color('#c1c5d6');
    // let seedVal = slider.value();
    // noiseSeed(seedVal);
    
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const noiseVal = noise(x / zoomFactor, y / zoomFactor); // generates a value between 0 - 1 with a zoomfactor that "narrows" where we are looking (closer pixels i guess is another way of describing)

            // console.log(noiseVal);
            
            // set(x, y, color(255 * noiseVal)); // multiplies the noise value by 255 to get grayscale colour and sets it at (x, y) pixel

            // now uses colour instead of grayscale, (better colour values from htmlcolorcodes.com and colorpallets.net)
            let terrainCol;

            if (noiseVal < WaterTerrain.maxHeight) {
                terrainCol = generateTerrainColor(noiseVal, WaterTerrain);

            } else if(noiseVal < SandTerrain.maxHeight) { 
                terrainCol = generateTerrainColor(noiseVal, SandTerrain);

            } else if (noiseVal < GrassTerrain.maxHeight) {
                terrainCol = generateTerrainColor(noiseVal, GrassTerrain);

            } else if (noiseVal < TreeTerain.maxHeight){
                terrainCol = generateTerrainColor(noiseVal, TreeTerain);
                
            } else {
                terrainCol = generateTerrainColor(noiseVal, MountainTerrain);

            }

            set(x, y, terrainCol);

        }

    }

    updatePixels();

}

class TerrainType {
    constructor(MinHeight, MaxHeight, MinColour, MaxColour, LerpValue = 0) {
        this.minHeight = MinHeight;
        this.maxHeight = MaxHeight;
        this.minColour = MinColour;
        this.maxColour = MaxColour;
        this.lerpValue = LerpValue;
    }
}

function generateTerrainColor(noiseValue, terrainType) {
    const normalizedValue = normalize(noiseValue, terrainType.maxHeight, terrainType.minHeight);

    let lerpColourValue = lerpColor(terrainType.minColour, terrainType.maxColour, normalizedValue + terrainType.lerpValue);
    
    return lerpColourValue;
}

function normalize(value, max, min) {
    if (value > max) {
        return 1;

    }

    if (value < min) {
        return 0;

    }

    return (value - min) / (max - min);
}

function updateSeed() {
    let seedVal = slider.value();
    noiseSeed(seedVal);
    updatePixels();
    // console.log(seedVal);
}

