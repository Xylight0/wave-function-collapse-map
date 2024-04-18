class Cell {
  constructor(num) {
    this.collapsed = false;
    if (num instanceof Array) {
      this.options = num;
    } else {
      this.options = new Array(num).fill(0).map((_, i) => i);
    }
  }
}
