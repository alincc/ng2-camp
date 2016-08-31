import {Injectable} from '@angular/core';
import {Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {Router} from '@ngrx/router';
import {AuthHttp} from 'angular2-jwt';
import {UrlProvider} from './urlProvider';

@Injectable()
export class CrudService {

  constructor(private authHttp: AuthHttp, private router: Router) {
  }

  public get<T>(url: string): Observable<T> {
    return this.wrapCallAndMap<T>(this.authHttp.get(UrlProvider.getBackendUrl(url)));
  }

  public post<T>(url: string, data: T): Observable<T> {
    let json = JSON.stringify(data);
    return this.wrapCallAndMap<T>(this.authHttp.post(UrlProvider.getBackendUrl(url), json));
  }

  public put<T>(url: string, data: T): Observable<T> {
    let json = JSON.stringify(data);
    return this.wrapCallAndMap<T>(this.authHttp.put(UrlProvider.getBackendUrl(url), json));
  }

  public doDelete(url: string): Observable<Response> {
    return this.wrapCall<Response>(this.authHttp.delete(UrlProvider.getBackendUrl(url)));
  }

  private wrapCallAndMap<T>(observable: Observable<Response>): Observable<T> {
    return this.wrapCall<T>(observable, this.responseToJsonObject);
  }

  private wrapCall<T>(observable: Observable<Response>, mapper: (n: Response) => any = n => n): Observable<T> {
    let subject = new Subject<T>();
    observable.subscribe(
      value => subject.next(mapper(value)),
      error => {
        if (!this.interceptError(error)) {
          subject.error(error);
        }
      },
      () => subject.complete()
    );
    return subject.asObservable();
  }

  private responseToJsonObject(res: Response): any {
    let body = res.json();
    return body || {};
  }

  private interceptError(error: Error) {
    console.log('error', error);
    if (error.message === 'No JWT present or has expired') {
      console.log('no JWT, redirecting to login page');
      this.router.go('/login');
      return true;
    }
    return false;
  }
}
