import {Component} from '@angular/core';
import {TabComponent} from './tab.component.ts';

@Component({
  selector: 'tabs',
  template: `
    <ul class="tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a class="waves-light btn blue">{{tab.title}}</a>
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

  public selectTab(tab: TabComponent) {
    console.log("selecting tab")
    _deactivateAllTabs(this.tabs);
    tab.active = true;

    function _deactivateAllTabs(tabs: TabComponent[]) {
      tabs.forEach((tab)=>tab.active = false);
    }

  }

  addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}
