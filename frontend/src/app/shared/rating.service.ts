import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {Rating} from '../model/backend-typings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RatingService {
  constructor(private crud: CrudService) {
  }

  saveRating(rating: Rating, hotelId: number): Observable<Rating> {
    return this.crud.post('/rest/hotels/' + hotelId + '/ratings', rating);
  }

  getByHotelId(id: number): Observable<Rating[]> {
    return this.crud.get('/rest/hotels/' + id + '/ratings');
  }
}
