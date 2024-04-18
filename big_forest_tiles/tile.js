class Tile {
  constructor(img, edges) {
    this.img = img;
    this.edges = edges;

    this.up = [];
    this.right = [];
    this.down = [];
    this.left = [];
  }

  analyze(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];

      // Tile 5 can't match itself
      if (tile.index == 5 && this.index == 5) continue;

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
