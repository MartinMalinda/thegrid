export interface GridItem {
  x: number;
  y: number;
  width: number;
  height: number;
  offsetX : number;
  offsetY : number;

  posX?: number;
  posY?: number;
  topNeighbor?: GridItem;
  leftNeighbor?: GridItem;
}

export interface GridRow extends Array<GridItem> {}

export interface GridArea extends Array<GridRow> {}