import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/from';
import {HotelService} from './../../shared/hotel.service.ts';
import {Hotel} from '../../model/backend-typings';
import FilterPipe from '../hotel.filter.pipe.ts';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import CountryFilterPipe from '../country.filter.pipe';
import {HotelsMapComponent} from './map/hotels-map.component';
import {TabsComponent} from './../tabs/tabs.component.ts';
import {TabComponent} from './../tabs/tab.component.ts';
import HotelFilterPipe from './../hotel.filter.pipe';

@Component({
  selector: 'hotels',
  directives: [MaterializeDirective, HotelsMapComponent, TabsComponent, TabComponent],
  providers: [],
  pipes: [FilterPipe, CountryFilterPipe],
  template: require('./hotel-overview.component.html')
})
export class HotelOverviewComponent implements OnInit {
  hotels:Hotel[] = [];
  filteredHotels:Hotel[] = [];
  countries:string[] = [];
  selectedValues = [];
  filteredInput:string = "";
  @ViewChild(HotelsMapComponent)
  hotelsMapComponent:HotelsMapComponent;


  constructor(private hotelService:HotelService) {
  }

  ngOnInit() {
    this.hotelService.getHotels()
      .subscribe((hotels:Hotel[]) => {
        this.hotels = hotels;
        this.filteredHotels = hotels;
        this.hotelsMapComponent.hotelSelectionChanged(hotels);
        this.countries = this.hotels
          .map((hotel:Hotel) => hotel.countryCode)
          .filter(this.onlyUnique)
          .sort();
      });
  }

  countrySelectionChanged(options) {
    this.selectedValues = Array.apply(undefined, options)
      .filter(option => option.selected)
      .map(option => option.value);
    this.filterCrieriaChanged();
  }

  filterHotels(event:KeyboardEvent) {
    this.filteredInput = event.target.value;
    this.filterCrieriaChanged();
  }

  filterCrieriaChanged() {
    let HotelsFilteredByCountry = new CountryFilterPipe().transform(this.hotels, this.selectedValues);
    this.filteredHotels = new HotelFilterPipe().transform(HotelsFilteredByCountry, this.filteredInput);
    this.hotelsMapComponent.hotelSelectionChanged(this.filteredHotels);
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
