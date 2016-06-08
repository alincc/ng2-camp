import {Component, OnInit} from "@angular/core";
import "rxjs/add/observable/from";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/distinct";
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {MailTemplate} from "../../model/backend-typings";

@Component({
  selector: 'mail-templates',
  directives: [MaterializeDirective],
  providers: [],
  pipes: [],
  template: require('./mailtemplates.component.html')
})
export class MailTemplatesComponent implements OnInit{
  isNewTemplate : boolean = true;
  mailTemplate : MailTemplate = {};
  private selectedOption = "";
  private selectOptions = [];

  ngOnInit() {
    this.selectOptions = [
      {value:1,name:"Option 1"},
      {value:2,name:"Option 2"},
      {value:3,name:"Option 3"}
    ]
  }

  addTemplate() {
    this.mailTemplate = {};
  }

  saveTemplate() {
    console.log(this.mailTemplate);
    // TODO service call
  }
}
