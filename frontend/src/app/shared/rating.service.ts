import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {Rating} from '../model/backend-typings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RatingService {
  constructor(private crud: CrudService) {
  }

  saveRating(rating: Rating): Observable<Rating> {
    return this.crud.post('/rest/ratings', rating);
  }

  getByHotelId(id: number): Observable<Rating[]> {
    return this.crud.get('/rest/ratings/byhotel/' + id);
  }
}
