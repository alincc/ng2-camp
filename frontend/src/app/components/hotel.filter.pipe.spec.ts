import HotelFilterPipe from './hotel.filter.pipe';
import {Hotel} from '../model/backend-typings';
import {TestDataGenerator} from '../model/test.data.generator';

describe('HotelFilterPipe', () => {
  let pipe: HotelFilterPipe;
  let hotels: Hotel[] = TestDataGenerator.generateHotels();
  let filter: string = '';

  beforeEach(() => {
    pipe = new HotelFilterPipe();
  });

  it('filters the hotels list by name and city', () => {
    filter = 'Schluch';
    let filteredAmount: number = 2;
    expect(pipe.transform(hotels, filter).length).toEqual(filteredAmount);
  });

  it('filters the hotels list by name and city and ignores cases', () => {
    filter = 'rItTEr';
    let filteredAmount: number = 2;
    expect(pipe.transform(hotels, filter).length).toEqual(filteredAmount);
  });
});
