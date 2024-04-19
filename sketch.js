let tilesImages = [];
let tiles = [];
let grid = [];

let DIM = 10;

function preload() {
  for (let i = 0; i <= 56; i++) {
    tilesImages.push(loadImage(`large_tiles/${i}.jpg`));
  }
}

function setup() {
  createCanvas(windowHeight, windowHeight);

  //Load and create tiles
  tiles[0] = new Tile(tilesImages[0], ["A", "A", "A", "A"], 0);
  tiles[1] = new Tile(tilesImages[1], ["A", "A", "A", "A"], 1);
  tiles[2] = new Tile(tilesImages[2], ["A", "A", "A", "A"], 2);
  tiles[3] = new Tile(tilesImages[3], ["A", "A", "A", "A"], 3);
  tiles[4] = new Tile(tilesImages[4], ["A", "A", "A", "A"], 4);

  tiles[5] = new Tile(tilesImages[5], ["A", "B", "A", "B"], 5);
  tiles[6] = new Tile(tilesImages[6], ["A", "B", "A", "B"], 6);
  tiles[7] = new Tile(tilesImages[7], ["A", "B", "A", "B"], 7);

  tiles[8] = new Tile(tilesImages[8], ["A", "C", "A", "C"], 8);
  tiles[9] = new Tile(tilesImages[9], ["A", "C", "A", "C"], 9);
  tiles[10] = new Tile(tilesImages[10], ["A", "C", "A", "C"], 10);
  tiles[11] = new Tile(tilesImages[11], ["A", "C", "A", "C"], 11);
  tiles[12] = new Tile(tilesImages[12], ["A", "C", "A", "C"], 12);
  tiles[13] = new Tile(tilesImages[13], ["A", "C", "A", "C"], 13);

  tiles[14] = new Tile(tilesImages[14], ["A", "B", "B", "A"], 14);
  tiles[15] = new Tile(tilesImages[15], ["A", "A", "B", "B"], 15);
  tiles[16] = new Tile(tilesImages[16], ["A", "A", "B", "B"], 16);
  tiles[17] = new Tile(tilesImages[17], ["A", "B", "B", "B"], 17);

  tiles[18] = new Tile(tilesImages[18], ["A", "C", "C", "A"], 18);
  tiles[19] = new Tile(tilesImages[19], ["A", "A", "C", "C"], 19);

  tiles[20] = new Tile(tilesImages[20], ["B", "B", "A", "A"], 20);
  tiles[21] = new Tile(tilesImages[21], ["B", "B", "A", "A"], 21);
  tiles[22] = new Tile(tilesImages[22], ["B", "A", "A", "B"], 22);
  tiles[23] = new Tile(tilesImages[23], ["B", "B", "A", "B"], 23);
  tiles[24] = new Tile(tilesImages[24], ["B", "A", "B", "A"], 24);
  tiles[25] = new Tile(tilesImages[25], ["B", "A", "B", "A"], 25);
  tiles[26] = new Tile(tilesImages[26], ["B", "A", "B", "A"], 26);
  tiles[27] = new Tile(tilesImages[27], ["B", "B", "B", "A"], 27);
  tiles[28] = new Tile(tilesImages[28], ["B", "A", "B", "B"], 28);

  tiles[29] = new Tile(tilesImages[29], ["B", "C", "B", "C"], 29);
  tiles[30] = new Tile(tilesImages[30], ["B", "C", "B", "C"], 30);
  tiles[31] = new Tile(tilesImages[31], ["B", "C", "C", "B"], 31);
  tiles[32] = new Tile(tilesImages[32], ["C", "C", "A", "A"], 32);
  tiles[33] = new Tile(tilesImages[33], ["C", "C", "A", "A"], 33);

  tiles[34] = new Tile(tilesImages[34], ["C", "A", "A", "C"], 34);
  tiles[35] = new Tile(tilesImages[35], ["C", "A", "A", "C"], 35);
  tiles[36] = new Tile(tilesImages[36], ["C", "A", "C", "A"], 36);
  tiles[37] = new Tile(tilesImages[37], ["C", "A", "C", "A"], 37);
  tiles[38] = new Tile(tilesImages[38], ["C", "C", "C", "A"], 38);
  tiles[39] = new Tile(tilesImages[39], ["C", "B", "C", "B"], 39);
  tiles[40] = new Tile(tilesImages[40], ["C", "A", "C", "C"], 40);

  tiles[41] = new Tile(tilesImages[41], ["C", "DT", "DL", "A"], 41);
  tiles[42] = new Tile(tilesImages[42], ["A", "DT", "DL", "A"], 42);
  tiles[43] = new Tile(tilesImages[43], ["A", "A", "DR", "DT"], 43);
  tiles[44] = new Tile(tilesImages[44], ["A", "DT", "E", "DT"], 44);
  tiles[45] = new Tile(tilesImages[45], ["C", "A", "DR", "DT"], 45);
  tiles[46] = new Tile(tilesImages[46], ["DL", "DB", "A", "A"], 46);

  tiles[47] = new Tile(tilesImages[47], ["DL", "DB", "C", "A"], 47);
  tiles[48] = new Tile(tilesImages[48], ["DL", "E", "DL", "A"], 48);
  tiles[49] = new Tile(tilesImages[49], ["DR", "A", "A", "DB"], 49);
  tiles[50] = new Tile(tilesImages[50], ["DR", "A", "A", "DB"], 50);

  tiles[51] = new Tile(tilesImages[51], ["DR", "A", "C", "DB"], 51);
  tiles[52] = new Tile(tilesImages[52], ["DR", "A", "DR", "E"], 52);
  tiles[53] = new Tile(tilesImages[53], ["E", "DB", "A", "DB"], 53);
  tiles[54] = new Tile(tilesImages[54], ["E", "DB", "DR", "E"], 54);

  tiles[55] = new Tile(tilesImages[55], ["E", "E", "E", "E"], 55);
  tiles[56] = new Tile(tilesImages[56], ["A", "B", "B", "A"], 56);

  //Generate the adjancency rules based on edges
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  startOver();
}

//Reset the grid
function startOver() {
  grid = [];
  //Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

function draw() {
  try {
    // Pick cell with the least entropy (fewest options)
    let gridCopy = grid.slice(); // Create a copy of the grid
    gridCopy = gridCopy.filter((cell) => !cell.collapsed); // Filter out collapsed cells

    if (gridCopy.length == 0) {
      return; // Exit draw function if all cells are collapsed
    }

    gridCopy.sort((a, b) => {
      return a.options.length - b.options.length; // Sort cells by the number of available options
    });

    let len = gridCopy[0].options.length; // Get the length of options in the cell with the least options
    // Filter cells that have more options than the smallest options length
    gridCopy = gridCopy.filter((cell) => cell.options.length === len);

    const cell = random(gridCopy); // Randomly select a cell from filtered cells
    cell.collapsed = true; // Collapse the selected cell
    const pick = random(cell.options); // Randomly pick an option for the collapsed cell
    cell.options = [pick]; // Set the cell's options to the picked option

    if (pick === undefined) {
      startOver(); // Restart if no valid pick is found
      return;
    }

    const w = height / DIM; // Calculate cell width
    const h = height / DIM; // Calculate cell height

    // Draw each cell in the grid
    for (let j = 0; j < DIM; j++) {
      for (let i = 0; i < DIM; i++) {
        let cell = grid[i + j * DIM];
        if (cell.collapsed) {
          let index = cell.options[0];
          image(tiles[index].img, i * w, j * h, w, h); // Draw the image for the collapsed cell
        } else {
          fill(0);
          stroke(255);
          rect(i * w, j * h, w, h);
        }
      }
    }

    // Generate the next grid based on adjacency rules
    const nextGrid = [];
    for (let j = 0; j < DIM; j++) {
      for (let i = 0; i < DIM; i++) {
        let index = i + j * DIM;
        if (grid[index].collapsed) {
          nextGrid[index] = grid[index]; // Copy collapsed cells to the next grid
        } else {
          let options = new Array(tiles.length).fill(0).map((_, i) => i); // Create an array of all options

          // Look up, right, down, and left to determine valid options based on adjacency rules
          if (j > 0) {
            let up = grid[i + (j - 1) * DIM];
            let validOptions = [];
            for (const option of up.options) {
              let valid = tiles[option].down;
              validOptions = validOptions.concat(valid);
            }
            checkValid(options, validOptions); // Check validity of options
          }
          nextGrid[index] = new Cell(options); // Create a new cell in the next grid with valid options
        }
      }
    }

    grid = nextGrid; // Update the grid with the next grid
  } catch (error) {
    console.error("draw failed");
  }
}

function checkValid(arr, valid) {
  for (let i = arr.length; i >= 0; i--) {
    if (!valid.includes(arr[i])) {
      arr.splice(i, 1);
    }
  }
}

function increaseValue() {
  var value = document.getElementById("number").value;
  document.getElementById("number").value = ++value;
}

function decreaseValue() {
  var value = document.getElementById("number").value;
  if (value == 1) return;
  document.getElementById("number").value = --value;
}

function refreshView() {
  DIM = document.getElementById("number").value;
  startOver();
}
