import {Component, OnInit} from "@angular/core";
import "rxjs/add/observable/from";
import "rxjs/add/operator/distinct";
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {MailTemplate} from "../../model/backend-typings";
import {MailTemplateService} from "../../shared/mailtemplate.service";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'mail-templates',
  directives: [MaterializeDirective],
  providers: [],
  pipes: [],
  template: require('./mailtemplates.component.html')
})
export class MailTemplatesComponent implements OnInit{
  isNewTemplate : boolean = false;
  mailTemplate : MailTemplate = {};

  private mailTemplates : MailTemplate[] = [];

  private selectedOption : string = "";
  private selectOptions = [];

  constructor(private mailTemplateService: MailTemplateService) {
  }

  ngOnInit() {
    this.refreshTemplates();
  }

  private refreshTemplates() {
    this.mailTemplateService.getAll().flatMap(res => Observable.from(res))
      .forEach((mailTemplate:MailTemplate) => {
          this.selectOptions.push({
            value: mailTemplate.id,
            name: mailTemplate.name
          });
          this.mailTemplates.push(mailTemplate);
        }
      );
  }

  addTemplate() {
    this.mailTemplate = {};
    this.isNewTemplate = true;
  }

  saveTemplate() {
    this.mailTemplateService.saveOrUpdate(this.mailTemplate)
      .subscribe((mailTemplate:MailTemplate) => {
          this.selectOptions.push(
            {
              value: mailTemplate.id,
              name: mailTemplate.name
            });
          this.selectedOption = "" + mailTemplate.id;
          this.mailTemplate = mailTemplate;
        }
      );

    this.isNewTemplate = false;
  }

  onChange(value) {
    var filteredTemplates = this.mailTemplates.filter(mailTemplate => mailTemplate.id == value);
    this.mailTemplate = filteredTemplates[0];
  }
}
