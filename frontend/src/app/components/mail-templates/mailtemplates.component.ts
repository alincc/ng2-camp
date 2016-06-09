import {Component, OnInit} from "@angular/core";
import "rxjs/add/observable/from";
import "rxjs/add/operator/distinct";
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {MailTemplate} from "../../model/backend-typings";
import {MailTemplateService} from "../../shared/mailtemplate.service";

@Component({
  selector: 'mail-templates',
  directives: [MaterializeDirective],
  providers: [],
  pipes: [],
  template: require('./mailtemplates.component.html')
})
export class MailTemplatesComponent implements OnInit{
  isNewTemplate : boolean = false;
  isTemplateChanged : boolean = false;

  private mailTemplate : MailTemplate = {};
  private mailTemplates : MailTemplate[] = [];
  private mailTemplateId : Number;

  constructor(private mailTemplateService: MailTemplateService) {
  }

  ngOnInit() {
    this.refreshTemplates2();
  }

  private refreshTemplates2() {
    this.mailTemplateService.getAll().subscribe(
      mailTemplates => this.templatesLoaded(mailTemplates)
    )
  }

  private templatesLoaded(mailTemplates:MailTemplate[]) {
    this.mailTemplates = mailTemplates;
    if(this.mailTemplates.length > 0) {
      this.mailTemplate = this.mailTemplates[0];
    } else {
      this.mailTemplate = {
        id: -1,
        name: "",
        text: ""
      }
    }
  }

  addTemplate() {
    this.mailTemplate = {};
    this.isNewTemplate = true;
  }

  saveTemplate() {
    this.mailTemplateService.saveOrUpdate(this.mailTemplate).subscribe(
      savedTemplate => {
        this.mailTemplate = savedTemplate;
        this.mailTemplates.push(savedTemplate);
        this.mailTemplateId = savedTemplate.id;
      }
    );

    this.isNewTemplate = false;
    this.isTemplateChanged = false;
  }

  onChange(optionId) {
    var matchedTemplates = this.mailTemplates.filter(template => template.id == optionId);
    this.mailTemplate = matchedTemplates[0];
  }

  onTemplateChange() {
    this.isTemplateChanged = true;
  }

  deleteTemplate() {
    this.mailTemplateService.deleteById(this.mailTemplate.id);
    this.refreshTemplates2();
  }


}
