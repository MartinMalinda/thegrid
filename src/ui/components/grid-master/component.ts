import Component, { tracked } from "@glimmer/component";
import { GridArea, GridItem, GridRow } from "../../../utils/types";
import { computeGridItem } from "../../../utils/grid-access";

export default class GridMaster extends Component {
  defaultWidth : number = 80;
  defaultHeight : number = 80;
  @tracked colsLength : number = 8;
  @tracked rowsLength : number = 12;
  @tracked grid : GridArea = [];

  constructor(options){
    super(options);
    console.log('consturcting');
    this.grid = this.generateGrid(this.colsLength, this.rowsLength);
  }

  generateGrid(colsLength, rowsLength){
    console.log('generateGrid');

    let plainGrid = this.generateArray(colsLength).map((arr, index) => {
      return this.generateRow(index, rowsLength);
    });

    return this.enhanceGrid(plainGrid);
  }

  enhanceGrid(grid: GridArea) : GridArea {
    grid.forEach((arr, y) => {
      arr.forEach((item, x) => {
        grid[y][x] = computeGridItem(grid, item);
      });
    });

    return grid;
  }

  generateRow(y: number, rowsLength: number) : GridRow {

    return this.generateArray(this.rowsLength).map((item, x) => {
      return {
        x,
        y,
        offsetX: 0,
        offsetY: 0,
        width: this.defaultWidth,
        height: this.defaultHeight
      };
    });
  }

  generateArray(length: number) : Array<any> {
    return (new Array(length)).fill({});
  }

  updateColsLength({target}){
    let number = parseInt(target.value);
    this.colsLength = number > -1 ? number : 0;
    this.grid = this.generateGrid(this.colsLength, this.rowsLength);
  }

  updateRowsLength({target}){
    let number = parseInt(target.value);
    this.rowsLength = number > -1 ? number : 0;
    this.grid = this.generateGrid(this.colsLength, this.rowsLength);
  }

  updateGridItem(gridItem : GridItem, newProperties){
    const newGridItem = computeGridItem(this.grid, {
      ...gridItem,
      ...newProperties
    });

    console.log(newGridItem);

    const grid = this.grid.slice(0).map(arr => arr.slice());
    grid[newGridItem.y][newGridItem.x] = newGridItem;

    this.grid = this.enhanceGrid(grid);
  }
}
