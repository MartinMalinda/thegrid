import { GridItem, GridArea } from './types';

export function getGridItem(grid : GridArea, x : number, y : number) : GridItem | void {
  if(x >= 0 && y >= 0){
    return grid[y][x];
  }
}

export function computeGridItem(grid: GridArea, gridItem: GridItem) : GridItem {
    const {x, width, y, offsetX, offsetY} = gridItem;
    const leftNeighbor = getGridItem(grid, x - 1, y);
    const topNeighbor = getGridItem(grid, x, y -1);

    if(leftNeighbor){
      gridItem.posX = leftNeighbor.posX + leftNeighbor.width + offsetX;
    } else {
      gridItem.posX = offsetX;
    }

    if(topNeighbor){
      gridItem.posY = topNeighbor.posY + topNeighbor.height + offsetY;
    } else {
      gridItem.posY = offsetY;
    }

    return gridItem;
}