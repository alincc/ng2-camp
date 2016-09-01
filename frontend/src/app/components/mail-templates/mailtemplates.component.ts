import {Component, OnInit} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {MailTemplate, Camp} from "../../model/backend-typings";
import {MailTemplateService} from "../../shared/mailtemplate.service";
import {MarkdownConverter} from "../markdown/markDownConverter";
import {CampService} from '../../shared/camp.service';

@Component({
  selector: 'mail-templates',
  directives: [MaterializeDirective],
  template: require('./mailtemplates.component.html')
})
export class MailTemplatesComponent implements OnInit {
  isNewTemplate:boolean = false;
  isTemplateChanged:boolean = false;

  private mailTemplate:MailTemplate = {};
  private mailTemplates:MailTemplate[] = [];
  private mailTemplateId:Number;
  private html:string = '';
  fromDateInput:string;
  toDateInput:string;
  emailInput:string;
  phoneInput:string;

  camps: Observable<Camp>;

  constructor(private mailTemplateService:MailTemplateService,
              private markDownConverter:MarkdownConverter,
              private campService: CampService) {
  }

  ngOnInit() {
    this.camps = this.campService.getCamps();
    this.refreshTemplates();
    // Trying to solve resize problem https://github.com/Dogfalo/materialize/issues/1503
    let body:any = $('body');
    body.on('focus', '.materialize-textarea', function () {
      let that:any = $(this);
      that.trigger('autoresize');
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
    this.html = this.replaceTemplateStrings(htmlTemplate);
  }

  onTemplateChange() {
    this.isTemplateChanged = true;
  }

  deleteTemplate() {
    this.mailTemplateService.deleteById(this.mailTemplate.id).subscribe(
      response => this.refreshTemplates()
    );
  }

  private replaceTemplateStrings(markDownString:string):string {
    markDownString = this.replaceIfReplacementIsNotEmpty(markDownString, "@CAMP_FROM@", this.fromDateInput);
    markDownString = this.replaceIfReplacementIsNotEmpty(markDownString, "@CAMP_TO@", this.toDateInput);
    markDownString = this.replaceIfReplacementIsNotEmpty(markDownString, "@CONTACT_EMAIL@", this.emailInput);
    markDownString = this.replaceIfReplacementIsNotEmpty(markDownString, "@CONTACT_PHONE@", this.phoneInput);
    return markDownString;
  }

  private replaceIfReplacementIsNotEmpty(inputString:string, stringToReplace:string, replacement:string):string {
    return replacement ? this.replaceAll(inputString, stringToReplace, replacement) : inputString;
  }

  private replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  private escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }


}
