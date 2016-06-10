import {Component, OnInit} from '@angular/core';
import {Camp, CampStatus} from '../../model/backend-typings';
import {Router, RouteParams} from '@ngrx/router';
import {MaterializeDirective} from 'angular2-materialize';
import {CampService} from '../../shared/camp.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'camp-new',
  directives: [MaterializeDirective, NgClass],
  providers: [],
  template: require('./camp-edit.component.html')
})
export class CampEditComponent implements OnInit {
  camp:Camp = { status: 'CREATED_CAMP' };
  campStates:CampStatus[] = ['CREATED_CAMP', 'CREATED_DOODLE', 'FIXED_DATE', 'GETTING_HOTEL_OFFERS', 'ACCEPTED_HOTEL_OFFER',
    'DECLINED_REMAINING_OFFERS', 'READY', 'OTHER', 'FURTHER_CLARIFICATION_NEEDED', 'CANCELLED'];

  constructor(private router:Router,
              private routeParams:RouteParams,
              private campService:CampService) {
  }

  ngOnInit() {
    this.routeParams.pluck('campId')
      .filter((campId) => !isNaN(campId))
      .flatMap((campId:number) => this.campService.getCamp(campId))
      .subscribe(
        (camp:Camp) => this.camp = camp
      );
  }

  saveCamp() {
    this.campService.saveCamp(this.camp).subscribe(
      (camp:Camp) => this.openCamp(camp)
    );
  }

  openCamp(camp:Camp) {
    this.router.go('/camps/' + camp.id);
  }
}
