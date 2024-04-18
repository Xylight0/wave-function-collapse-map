const tiles = [];

let grid = [];

const DIM = 20;
const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

function preload() {
  tiles[0] = loadImage("tiles/blank.png");
  tiles[1] = loadImage("tiles/up.png");
  tiles[2] = loadImage("tiles/right.png");
  tiles[3] = loadImage("tiles/down.png");
  tiles[4] = loadImage("tiles/left.png");
}

function setup() {
  createCanvas(800, 800);
  background(0);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [BLANK, UP, RIGHT, DOWN],
    };
  }
}

function mousePressed() {
  redraw();
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

  const w = 800 / DIM;
  const h = 800 / DIM;

  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index], i * w, j * h, w, h);
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
        let options = [BLANK, UP, RIGHT, DOWN, LEFT];

        //Look up
        if (j > 0) {
          let up = grid[i + (j - 1) * DIM];
          let validOptions = [];

          for (const option of up.options) {
            let valid = rules[option][2];
            validOptions = validOptions.concat(valid);
          }

          checkValid(options, validOptions);
        }

        //Look right
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM];
          let validOptions = [];

          for (const option of right.options) {
            let valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }

          checkValid(options, validOptions);
        }

        //Look down
        if (j < DIM - 1) {
          let down = grid[i + (j + 1) * DIM];
          let validOptions = [];

          for (const option of down.options) {
            let valid = rules[option][0];
            validOptions = validOptions.concat(valid);
          }

          checkValid(options, validOptions);
        }

        //Look left
        if (i > 0) {
          let left = grid[i - 1 + j * DIM];
          let validOptions = [];

          for (const option of left.options) {
            let valid = rules[option][1];
            validOptions = validOptions.concat(valid);
          }

          checkValid(options, validOptions);
        }

        nextGrid[index] = {
          options,
          collaped: false,
        };
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

const rules = [
  [
    [BLANK, UP],
    [BLANK, RIGHT],
    [BLANK, DOWN],
    [BLANK, LEFT],
  ],
  [
    [RIGHT, DOWN, LEFT],
    [UP, DOWN, LEFT],
    [BLANK, DOWN],
    [UP, RIGHT, DOWN],
  ],
  [
    [RIGHT, DOWN, LEFT],
    [UP, DOWN, LEFT],
    [UP, RIGHT, LEFT],
    [BLANK, LEFT],
  ],
  [
    [BLANK, UP],
    [UP, DOWN, LEFT],
    [UP, RIGHT, LEFT],
    [UP, RIGHT, DOWN],
  ],
  [
    [RIGHT, DOWN, LEFT],
    [BLANK, RIGHT],
    [UP, RIGHT, LEFT],
    [UP, RIGHT, DOWN],
  ],
];
