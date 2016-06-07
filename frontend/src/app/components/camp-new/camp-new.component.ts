import {Component} from "@angular/core";
import {Camp} from "../../model/backend-typings";
import {Router} from "@ngrx/router";
import {MaterializeDirective} from "angular2-materialize";
import {CampService} from "../../shared/camp.service";

@Component({
  selector: 'camp-new',
  directives: [MaterializeDirective],
  providers: [],
  template: require('./camp-new.component.html')
})
export class CampNewComponent {
  camp: Camp = {};

  constructor(private router: Router, private campService : CampService) {
  }


  saveCamp() {
    this.campService.saveCamp(this.camp);
  }

  openCamp(camp: Camp) {
    this.router.go('/camps/' + camp.id);
  }
}
