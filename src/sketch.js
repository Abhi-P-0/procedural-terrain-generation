
let width = 600;
let height = 600;
let zoomFactor = 100;
let cachedSeed = 1;

let WaterTerrain;
let SandTerrain;
let GrassTerrain;
let TreeTerain;
let MountainTerrain;

let updateMap = false;

function setup() {
    createCanvas(width, height);
    background(200);
    frameRate(60);
    noiseDetail(9, 0.5);
    noiseSeed(cachedSeed);

    createSeedSlider();
    createSaveButton();

    WaterTerrain = new TerrainType(0, 0.4, color(30, 176, 251), color(40, 255, 255), 0);
    SandTerrain = new TerrainType(0.4, 0.5, color(215, 192, 158), color(255, 246, 193), 0.3);
    GrassTerrain = new TerrainType(0.5, 0.6, color(2, 166, 155), color(118, 239, 124), 0);
    TreeTerain = new TerrainType(0.6, 0.75, color(22, 181, 141), color(10, 145, 113), -0.5);
    MountainTerrain = new TerrainType(0.75, 1, color('#c1c5d6'), color('#ebecf0'), 0);

    drawTerrain();
    
}


function draw() {
    
    if (updateMap) {
        drawTerrain();
    }

}


function drawTerrain() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const noiseVal = noise(x / zoomFactor, y / zoomFactor); // generates a value between 0 - 1 with a zoomfactor that "narrows" where we are looking (closer pixels i guess is another way of describing)

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

    updateMap = false;
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

function mouseWheel(event) {
    updateMap = true;

    if (event.delta > 0) {
        zoomFactor -= 10;

    } else {
        zoomFactor += 10;

    }
}

function createSeedSlider() {
    seedSliderLable = createDiv("Seed");
    seedSliderLable.position(10, 740);

    seedSlider = createSlider(0, 100000000, 1);
    seedSlider.position(10, 760);
    seedSlider.size(500);
    seedSlider.input(updateSeed);

    seedInput = createInput(cachedSeed.toString());
    seedInput.position(525, 760);
    seedInput.input(updateSeedInput);
}

function updateSeed() {
    updateMap = true;

    cachedSeed = seedSlider.value();
    noiseSeed(cachedSeed);
    seedInput.value(cachedSeed);

}

function updateSeedInput() {
    updateMap = true;

    let temp = seedInput.value();

    noiseSeed(temp);

    seedSlider.value(temp);

}

function createSaveButton() {
    let saveButton = createButton('Save Terrain');
    saveButton.position(10, 705);

    saveButton.mousePressed(saveTerrain);
}

function saveTerrain() {
    saveCanvas();
}

