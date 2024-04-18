const tilesImages = [];
const tiles = [];
let grid = [];

const DIM = 40;

function preload() {
  for (let i = 0; i <= 12; i++) {
    tilesImages.push(loadImage(`circuit/${i}.png`));
  }
}

function setup() {
  createCanvas(1000, 1000);

  //Loaded and created the tiles
  tiles[0] = new Tile(tilesImages[0], ["AAA", "AAA", "AAA", "AAA"]);
  tiles[1] = new Tile(tilesImages[1], ["BBB", "BBB", "BBB", "BBB"]);
  tiles[2] = new Tile(tilesImages[2], ["BBB", "BCB", "BBB", "BBB"]);
  tiles[3] = new Tile(tilesImages[3], ["BBB", "BDB", "BBB", "BDB"]);
  tiles[4] = new Tile(tilesImages[4], ["ABB", "BCB", "BBA", "AAA"]);
  tiles[5] = new Tile(tilesImages[5], ["ABB", "BBB", "BBB", "BBA"]);
  tiles[6] = new Tile(tilesImages[6], ["BBB", "BCB", "BBB", "BCB"]);
  tiles[7] = new Tile(tilesImages[7], ["BDB", "BCB", "BDB", "BCB"]);
  tiles[8] = new Tile(tilesImages[8], ["BDB", "BBB", "BCB", "BBB"]);
  tiles[9] = new Tile(tilesImages[9], ["BCB", "BCB", "BBB", "BCB"]);
  tiles[10] = new Tile(tilesImages[10], ["BCB", "BCB", "BCB", "BCB"]);
  tiles[11] = new Tile(tilesImages[11], ["BCB", "BCB", "BBB", "BBB"]);
  tiles[12] = new Tile(tilesImages[12], ["BBB", "BCB", "BBB", "BCB"]);

  for (let i = 0; i < 11; i++) {
    for (let j = 1; j < 4; j++) {
      tiles.push(tiles[i].rotate(j));
    }
  }

  //Generate the adjancency rules based on edges
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  startOver();
}

function startOver() {
  //Create cell for each spot on the grid
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

  if (pick === undefined) {
    startOver();
    return;
  }

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
