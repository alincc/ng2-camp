import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {OfferRequest, MailTemplate} from "../model/backend-typings";
import {CrudService} from "./crud.service";

@Injectable()
export class MailTemplateService {

  private baseUrl : string = "/rest/mailtemplates";

  constructor(private crud: CrudService) {
  }

  saveOrUpdate(mailtemplate: MailTemplate): Observable<MailTemplate> {
    return this.crud.post(this.baseUrl, mailtemplate);
  }

  getAll(): Observable<OfferRequest[]> {
    return this.crud.get(this.baseUrl);
  }

  getById(id: number): Observable<OfferRequest> {
    return this.crud.get(this.baseUrl + '/' + id);
  }

  deleteById(id: number): Observable<Response> {
    return this.crud.doDelete(this.baseUrl + id);
  }
}
