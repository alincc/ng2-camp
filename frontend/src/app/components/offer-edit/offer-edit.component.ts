import {Component} from '@angular/core';
import {Router} from '@ngrx/router';

@Component({
  selector: 'offer-edit',
  directives: [],
  providers: [],
  template: require('./offer-edit.component.html')
})
export class OfferEditComponent {

  constructor(private router: Router) {
  }
}
