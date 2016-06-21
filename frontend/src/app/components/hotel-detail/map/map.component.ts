import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Rx';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {MapService} from '../../../shared/map/map.service';
import {Hotel} from '../../../model/backend-typings';
import {Coordinate} from '../../../shared/map/coordinate';

@Component({
  selector: 'map',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  providers: [ANGULAR2_GOOGLE_MAPS_PROVIDERS, MapService],
  styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
  template: require('./map.component.html')
})
export class MapComponent implements OnInit {

  @Input() hotelObservable: Observable<Hotel>;
  coordinate: Coordinate;

  private subscription: Subscription;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.subscription = this.hotelObservable.flatMap(hotel => this.mapService.getCoordinate(hotel))
      .subscribe(coordinate => {
        this.coordinate = coordinate;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
