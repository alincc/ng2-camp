import {Component, OnInit} from "@angular/core";
import "rxjs/add/observable/from";
import "rxjs/add/operator/distinct";
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {MailTemplate} from "../../model/backend-typings";
import {MailTemplateService} from "../../shared/mailtemplate.service";
import {MarkdownConverter} from "../markdown/markDownConverter";

@Component({
  selector: 'mail-templates',
  directives: [MaterializeDirective],
  providers: [],
  pipes: [],
  template: require('./mailtemplates.component.html')
})
export class MailTemplatesComponent implements OnInit {
  isNewTemplate:boolean = false;
  isTemplateChanged:boolean = false;

  private mailTemplate:MailTemplate = {};
  private mailTemplates:MailTemplate[] = [];
  private mailTemplateId:Number;
  private html:string = '';

  constructor(private mailTemplateService:MailTemplateService, private markDownConverter:MarkdownConverter) {
  }

  ngOnInit() {
    this.refreshTemplates();
    // Trying to solve resize problem https://github.com/Dogfalo/materialize/issues/1503
    $('body').on('focus', '.materialize-textarea', function () {
      $(this).trigger('autoresize');
    })
  }

  private refreshTemplates() {
    this.mailTemplateService.getAll().subscribe(
      mailTemplates => this.templatesLoaded(mailTemplates)
    )
  }

  private templatesLoaded(mailTemplates:MailTemplate[]) {
    this.mailTemplates = mailTemplates;
    if (this.mailTemplates.length > 0) {
      this.mailTemplate = this.mailTemplates[0];
      this.mailTemplateId = this.mailTemplate.id;
      this.refreshHtml(this.mailTemplate.text);
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
        if (!this.isTemplateChanged) {
          console.log("add");
          this.mailTemplate = savedTemplate;
          this.mailTemplates.push(savedTemplate);
          this.mailTemplateId = savedTemplate.id;
        }
        this.isNewTemplate = false;
        this.isTemplateChanged = false;
      }
    );
  }

  onChange(optionId) {
    var matchedTemplates = this.mailTemplates.filter(template => template.id == optionId);
    this.mailTemplate = matchedTemplates[0];
  }

  private refreshHtml(templateText:string) {
    let htmlTemplate = this.markDownConverter.convert(templateText);
    this.html = htmlTemplate;
  }

  onTemplateChange() {
    this.isTemplateChanged = true;
  }

  deleteTemplate() {
    this.mailTemplateService.deleteById(this.mailTemplate.id).subscribe(
      response => this.refreshTemplates()
    );
  }


}
