
import {Injectable} from '@angular/core';

@Injectable()
export class TooltipWorkaround {
  public static removeTooltipsFromDom() {
    let elements: Element[] = Array.prototype.slice.call(document.getElementsByClassName('material-tooltip'));
    elements.forEach(element => element.remove());
  }
}
