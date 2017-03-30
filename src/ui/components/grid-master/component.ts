import Component, { tracked } from "@glimmer/component";

interface GridItem {
  x: number;
  y: number;
  width: number;
  height: number;

  posX?: number;
  posY?: number;
  topNeighbor?: GridItem;
  leftNeighbor?: GridItem;
}

interface GridRow extends Array<GridItem> {}

interface GridArea extends Array<GridRow> {}

export default class GridMaster extends Component {
  @tracked grid : GridArea = [];
  defaultWidth : number = 80;
  defaultHeight : number = 80;

  constructor(options){
    super(options);

    this.grid = this.initGrid(15, 15);
  }

  initGrid(rowsLength: number, colsLength: number) : GridArea {
    return this.generateArray(colsLength).map((arr, index) => {
      return this.generateRow(index, rowsLength);
    });
  }

  generateRow(y: number, rowsLength: number) : GridRow {
    return this.generateArray(rowsLength).map((item, x) => {
      return {
        x,
        y,
        width: this.defaultWidth,
        height: this.defaultHeight
      };
    });
  }

  generateArray(length: number) : Array<any> {
    return (new Array(length)).fill({});
  }
}
