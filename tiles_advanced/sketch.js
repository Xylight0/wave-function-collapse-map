const tilesImages = [];
const tiles = [];
let grid = [];

const DIM = 20;

function preload() {
  tilesImages[0] = loadImage("tiles/blank.png");
  tilesImages[1] = loadImage("tiles/up.png");
  /*  tiles[2] = loadImage("tiles/right.png");
  tiles[3] = loadImage("tiles/down.png");
  tiles[4] = loadImage("tiles/left.png"); */
}

function setup() {
  createCanvas(400, 400);

  //Loaded and created the tiles
  tiles[0] = new Tile(tilesImages[0], [0, 0, 0, 0]);
  tiles[1] = new Tile(tilesImages[1], [1, 1, 0, 1]);
  tiles[2] = tiles[1].rotate(1);
  tiles[3] = tiles[1].rotate(2);
  tiles[4] = tiles[1].rotate(3);

  //Generate the adjancency rules based on edges
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

function draw() {
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

  const w = width / DIM;
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
}

function checkValid(arr, valid) {
  for (let i = arr.length; i >= 0; i--) {
    if (!valid.includes(arr[i])) {
      arr.splice(i, 1);
    }
  }
}
