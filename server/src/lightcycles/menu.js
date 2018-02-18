class Menu {
  constructor() {
    this.selection = 2;
  }

  getSelection() {
    return this.selection;
  }

  updateSelection(key) {
    if (key == 38) { this.moveUp(); }
    else if (key = 40) { this.moveDown(); }
  }

  moveUp() {
    this.selection = Math.max(this.selection - 1, 2);
  }

  moveDown() {
    this.selection = Math.min(this.selection + 1, 4);
  }
}

export default Menu;
