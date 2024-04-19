class Tile {
  constructor(img, edges, index) {
    this.img = img;
    this.edges = edges;
    this.index = index;

    this.up = [];
    this.right = [];
    this.down = [];
    this.left = [];
  }

  analyze(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];

      // Island tiles should not be adjacent to each othe
      if (tile.index == 55 && this.index == 55) continue;

      // UP
      if (tile.edges[2] === this.edges[0]) {
        this.up.push(i);
      }
      // RIGHT
      if (tile.edges[3] === this.edges[1]) {
        this.right.push(i);
      }
      // DOWN
      if (tile.edges[0] === this.edges[2]) {
        this.down.push(i);
      }
      // LEFT
      if (tile.edges[1] === this.edges[3]) {
        this.left.push(i);
      }
    }
  }
}
