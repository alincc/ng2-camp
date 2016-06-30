import {Hotel} from './backend-typings';
import {Coordinate} from './coordinate';

export class HotelWithCoordinate {
  constructor(public hotel:Hotel,
              public coordinate:Coordinate) {
  }
}
