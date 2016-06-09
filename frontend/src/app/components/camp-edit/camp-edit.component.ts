import {Component} from '@angular/core';
import {Camp} from '../../model/backend-typings';
import {Router} from '@ngrx/router';
import {MaterializeDirective} from 'angular2-materialize';
import {CampService} from '../../shared/camp.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'camp-new',
  directives: [MaterializeDirective, NgClass],
  providers: [],
  template: require('./camp-edit.component.html')
})
export class CampEditComponent {
  camp: Camp = {};

  constructor(private router: Router, private campService: CampService) {
  }


  saveCamp() {
    this.campService.saveCamp(this.camp);
  }

  openCamp(camp: Camp) {
    this.router.go('/camps/' + camp.id);
  }
}
