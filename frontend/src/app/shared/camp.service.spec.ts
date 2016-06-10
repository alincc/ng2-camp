import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {CampService} from './camp.service';
import {provide} from '@angular/core';
import {Response,} from '@angular/http';
import {Camp} from '../model/backend-typings';
import {CrudService} from './crud.service';

describe('camp service', () => {

  let resp$:Observable<Response> = new Subject();

  beforeEachProviders(() => [
    provide(
      CrudService, {
        useValue: {
          get: (url:string) => {
            return resp$;
          }
        }
      }), CampService
  ]);

  it('getCamps should return a camp', injectAsync([CampService], (service:CampService) => {
    return new Promise((resolve) => {
      service.getCamps().subscribe((camps:Camp[]) => {
        expect(camps[0]).toEqual({
          name: 'testCamp'
        });
        resolve();
      });
      resp$.next([{
        name: 'testCamp'
      }]);
    });
  }))
});
