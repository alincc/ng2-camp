import {Component, Input} from '@angular/core';
import {TabsComponent} from './tabs.component.ts';

@Component({
  selector: 'tab',
  styles: [`
    .pane{
      padding: 1em;
    }
  `],
  template: `
    <div [hidden]="!active" class="tab">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {

  public STYLE_ACTIVE: string = "waves-light btn blue";
  public STYLE_INACTIVE: string = "waves-light btn grey darken-2";

  @Input('tab-title') title: string;
  active: boolean;
  style: string = this.STYLE_INACTIVE;

  constructor(tabs: TabsComponent) {
    tabs.addTab(this);
  }
}
