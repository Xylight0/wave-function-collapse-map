let tilesImages = [];
let tiles = [];
let grid = [];

let DIM = 10;

function preload() {
  for (let i = 0; i <= 56; i++) {
    tilesImages.push(loadImage(`small_tiles/${i}.jpg`));
  }
}

function setup() {
  createCanvas(windowHeight, windowHeight);

  //Load and create tiles
  tiles[0] = new Tile(tilesImages[0], ["A", "A", "A", "A"]);
  tiles[1] = new Tile(tilesImages[1], ["A", "A", "A", "A"]);
  tiles[2] = new Tile(tilesImages[2], ["A", "A", "A", "A"]);
  tiles[3] = new Tile(tilesImages[3], ["A", "A", "A", "A"]);
  tiles[4] = new Tile(tilesImages[4], ["A", "A", "A", "A"]);

  tiles[5] = new Tile(tilesImages[5], ["A", "B", "A", "B"]);
  tiles[6] = new Tile(tilesImages[6], ["A", "B", "A", "B"]);
  tiles[7] = new Tile(tilesImages[7], ["A", "B", "A", "B"]);

  tiles[8] = new Tile(tilesImages[8], ["A", "C", "A", "C"]);
  tiles[9] = new Tile(tilesImages[9], ["A", "C", "A", "C"]);
  tiles[10] = new Tile(tilesImages[10], ["A", "C", "A", "C"]);
  tiles[11] = new Tile(tilesImages[11], ["A", "C", "A", "C"]);
  tiles[12] = new Tile(tilesImages[12], ["A", "C", "A", "C"]);
  tiles[13] = new Tile(tilesImages[13], ["A", "C", "A", "C"]);

  tiles[14] = new Tile(tilesImages[14], ["A", "B", "B", "A"]);
  tiles[15] = new Tile(tilesImages[15], ["A", "A", "B", "B"]);
  tiles[16] = new Tile(tilesImages[16], ["A", "A", "B", "B"]);
  tiles[17] = new Tile(tilesImages[17], ["A", "B", "B", "B"]);

  tiles[18] = new Tile(tilesImages[18], ["A", "C", "C", "A"]);
  tiles[19] = new Tile(tilesImages[19], ["A", "A", "C", "C"]);

  tiles[20] = new Tile(tilesImages[20], ["B", "B", "A", "A"]);
  tiles[21] = new Tile(tilesImages[21], ["B", "B", "A", "A"]);
  tiles[22] = new Tile(tilesImages[22], ["B", "A", "A", "B"]);
  tiles[23] = new Tile(tilesImages[23], ["B", "B", "A", "B"]);
  tiles[24] = new Tile(tilesImages[24], ["B", "A", "B", "A"]);
  tiles[25] = new Tile(tilesImages[25], ["B", "A", "B", "A"]);
  tiles[26] = new Tile(tilesImages[26], ["B", "A", "B", "A"]);
  tiles[27] = new Tile(tilesImages[27], ["B", "B", "B", "A"]);
  tiles[28] = new Tile(tilesImages[28], ["B", "A", "B", "B"]);

  tiles[29] = new Tile(tilesImages[29], ["B", "C", "B", "C"]);
  tiles[30] = new Tile(tilesImages[30], ["B", "C", "B", "C"]);
  tiles[31] = new Tile(tilesImages[31], ["B", "C", "C", "B"]);
  tiles[32] = new Tile(tilesImages[32], ["C", "C", "A", "A"]);
  tiles[33] = new Tile(tilesImages[33], ["C", "C", "A", "A"]);

  tiles[34] = new Tile(tilesImages[34], ["C", "A", "A", "C"]);
  tiles[35] = new Tile(tilesImages[35], ["C", "A", "A", "C"]);
  tiles[36] = new Tile(tilesImages[36], ["C", "A", "C", "A"]);
  tiles[37] = new Tile(tilesImages[37], ["C", "A", "C", "A"]);
  tiles[38] = new Tile(tilesImages[38], ["C", "C", "C", "A"]);
  tiles[39] = new Tile(tilesImages[39], ["C", "B", "C", "B"]);
  tiles[40] = new Tile(tilesImages[40], ["C", "A", "C", "C"]);

  tiles[41] = new Tile(tilesImages[41], ["C", "DT", "DL", "A"]);
  tiles[42] = new Tile(tilesImages[42], ["A", "DT", "DL", "A"]);
  tiles[43] = new Tile(tilesImages[43], ["A", "A", "DR", "DT"]);
  tiles[44] = new Tile(tilesImages[44], ["A", "DT", "E", "DT"]);
  tiles[45] = new Tile(tilesImages[45], ["C", "A", "DR", "DT"]);
  tiles[46] = new Tile(tilesImages[46], ["DL", "DB", "A", "A"]);

  tiles[47] = new Tile(tilesImages[47], ["DL", "DB", "C", "A"]);
  tiles[48] = new Tile(tilesImages[48], ["DL", "E", "DL", "A"]);
  tiles[49] = new Tile(tilesImages[49], ["DR", "A", "A", "DB"]);
  tiles[50] = new Tile(tilesImages[50], ["DR", "A", "A", "DB"]);

  tiles[51] = new Tile(tilesImages[51], ["DR", "A", "C", "DB"]);
  tiles[52] = new Tile(tilesImages[52], ["DR", "A", "DR", "E"]);
  tiles[53] = new Tile(tilesImages[53], ["E", "DB", "A", "DB"]);
  tiles[54] = new Tile(tilesImages[54], ["E", "DB", "DR", "E"]);

  tiles[55] = new Tile(tilesImages[55], ["E", "E", "E", "E"]);
  tiles[56] = new Tile(tilesImages[56], ["A", "B", "B", "A"]);

  //Generate the adjancency rules based on edges
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  startOver();
}

function startOver() {
  grid = [];
  //Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

function draw() {
  try {
    //Pick cell with least entropy
    let gridCopy = grid.slice();
    gridCopy = gridCopy.filter((cell) => !cell.collapsed);

    if (gridCopy.length == 0) {
      return;
    }

    gridCopy.sort((a, b) => {
      return a.options.length - b.options.length;
    });

    let len = gridCopy[0].options.length;
    //Sort every cell out that has more options then the smallest options len
    gridCopy = gridCopy.filter((cell) => cell.options.length === len);

    const cell = random(gridCopy);
    cell.collapsed = true;
    const pick = random(cell.options);
    cell.options = [pick];

    if (pick === undefined) {
      startOver();
      return;
    }

    const w = height / DIM;
    const h = height / DIM;

    for (let j = 0; j < DIM; j++) {
      for (let i = 0; i < DIM; i++) {
        let cell = grid[i + j * DIM];
        if (cell.collapsed) {
          let index = cell.options[0];
          image(tiles[index].img, i * w, j * h, w, h);
        } else {
          fill(0);
          stroke(255);
          rect(i * w, j * h, w, h);
        }
      }
    }

    const nextGrid = [];
    for (let j = 0; j < DIM; j++) {
      for (let i = 0; i < DIM; i++) {
        let index = i + j * DIM;
        if (grid[index].collapsed) {
          nextGrid[index] = grid[index];
        } else {
          let options = new Array(tiles.length).fill(0).map((_, i) => i);

          //Look up
          if (j > 0) {
            let up = grid[i + (j - 1) * DIM];
            let validOptions = [];

            for (const option of up.options) {
              let valid = tiles[option].down;
              validOptions = validOptions.concat(valid);
            }

            checkValid(options, validOptions);
          }

          //Look right
          if (i < DIM - 1) {
            let right = grid[i + 1 + j * DIM];
            let validOptions = [];

            for (const option of right.options) {
              let valid = tiles[option].left;
              validOptions = validOptions.concat(valid);
            }

            checkValid(options, validOptions);
          }

          //Look down
          if (j < DIM - 1) {
            let down = grid[i + (j + 1) * DIM];
            let validOptions = [];

            for (const option of down.options) {
              let valid = tiles[option].up;
              validOptions = validOptions.concat(valid);
            }

            checkValid(options, validOptions);
          }

          //Look left
          if (i > 0) {
            let left = grid[i - 1 + j * DIM];
            let validOptions = [];

            for (const option of left.options) {
              let valid = tiles[option].right;
              validOptions = validOptions.concat(valid);
            }

            checkValid(options, validOptions);
          }

          nextGrid[index] = new Cell(options);
        }
      }
    }

    grid = nextGrid;
  } catch (error) {
    console.log("draw failed");
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
