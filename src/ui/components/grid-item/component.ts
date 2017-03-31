import Component, { tracked } from '@glimmer/component';
import { getGridItem } from '../../../utils/grid-access';

export default class GridItem extends Component {

  @tracked isDragging : boolean = false;
  @tracked dragStartX : number;
  @tracked dragStartY : number;


  @tracked('isDragging')
  get className() : string {
    if(this.isDragging){
      return "grid-item dragging";
    }

    return "grid-item";
  }

  startDragging(event) : void {
    if(event.metaKey || event.ctrlKey){
      let { width, height }  = this.args.model;
      width = width + 20;
      height = height + 20;
      this.args.onChange({width,height});
    } else {
      this.dragStartX = event.screenX;
      this.dragStartY = event.screenY;
      this.isDragging = true;
    }
  }

  stopDragging() : void {
    this.isDragging = false;
  }

  moveTile(event) : void {
    if(this.isDragging){
      let offsetX = event.screenX - this.dragStartX;
      let offsetY = event.screenY - this.dragStartY;
      this.args.onChange({offsetX, offsetY});
    }
  }
};
