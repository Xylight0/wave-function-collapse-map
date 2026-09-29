# Wave Function Collapse

A tile-based implementation of the **Wave Function Collapse (WFC)** algorithm for procedural map generation.

The project takes a set of input images and uses their local patterns and constraints to generate new, larger maps with similar visual characteristics.

<p align="center">
  <img src="assets/wfc-demo.gif" alt="Wave Function Collapse demo" width="800">
</p>

[Live Demo](https://xylight0.github.io/wave-function-collapse-map/)

## Features

- Tile-based procedural generation
- Constraint propagation between neighboring tiles
- Configurable tilesets and output dimensions
- Real-time visualization of the generation process
- Browser-based interactive demo

## Input Data

The generator uses a dataset of **57 input images**. Depending on the dataset version, the images are either:

- `100 × 100` pixels
- `3200 × 3200` pixels

These images provide the patterns and visual rules used during generation.

## How It Works

WFC starts with every cell containing multiple possible tiles. The algorithm then repeatedly:

1. Selects the cell with the lowest entropy
2. Collapses it to one possible tile
3. Propagates the resulting constraints to neighboring cells
4. Repeats until the map is fully generated

This allows complex map structures to emerge from relatively simple local rules.

## Getting Started

```bash
git clone https://github.com/Xylight0/wave-function-collapse-map.git
cd big_forest_tiles
```

Open `index.html` in your browser to run the project.

## Try It

A live version is available here:

[https://xylight0.github.io/wave-function-collapse-map/](https://xylight0.github.io/wave-function-collapse-map/)
