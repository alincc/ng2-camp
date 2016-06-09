import {Component} from '@angular/core';
import { TabComponent } from './tab.component.ts';

@Component({
  selector: 'tabs',
  template:`
    <ul class="tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a [class]="tab.style">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class TabsComponent {

  tabs: TabComponent[];


  constructor() {
    this.tabs = [];
  }
  public selectTab(tab: TabComponent){
    _deactivateAllTabs(this.tabs);
    tab.active = true;
    tab.style = tab.STYLE_ACTIVE;

    function _deactivateAllTabs(tabs: TabComponent[]){
      tabs.forEach((tab: TabComponent) => {
        tab.active = false;
        tab.style = tab.STYLE_INACTIVE;
      });
    }

  }

  addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
      tab.style = tab.STYLE_ACTIVE;
    }
    this.tabs.push(tab);
  }
}
