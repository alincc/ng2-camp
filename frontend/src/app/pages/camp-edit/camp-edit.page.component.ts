import {Component, OnInit, OnDestroy} from '@angular/core';
import {Camp} from '../../model/backend-typings';
import {Router, RouteParams} from '@ngrx/router';
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/of';
import {CampService} from '../../shared/camp.service';
import {Observable} from 'rxjs/Observable';
import {CampEditComponent} from '../../components/camp-edit/camp-edit.component';

@Component({
  selector: 'camp-edit-page',
  directives: [CampEditComponent],
  template: `
    <camp-edit
      [camp]="camp | async"
      (saveCamp)="saveCamp($event)">
    </camp-edit>
`
})
export class CampEditPageComponent implements OnInit, OnDestroy {

  camp: Observable<Camp>;
  campIdSubscription: Subscription;

  constructor(private router:Router,
              private routeParams:RouteParams,
              private campService:CampService) {
  }

  ngOnInit() {
    this.campIdSubscription = this.routeParams.pluck<string>('campId')
      .map(id => parseInt(id))
      .subscribe(campId => {
        if (!isNaN(campId)) {
          this.camp = this.campService.getCamp(campId);
        } else {
          this.camp = Observable.of({} as Camp);
        }
      });
  }

  ngOnDestroy() {
    this.campIdSubscription.unsubscribe();
  }

  saveCamp(camp: Camp) {
    this.campService.saveCamp(camp).subscribe(
      (camp) => this.router.go('/camps/' + camp.id)
    );
  }
}
