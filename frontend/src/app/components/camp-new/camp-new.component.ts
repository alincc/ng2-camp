import {Component} from "@angular/core";
import {Hotel, Camp} from "../../model/backend-typings";
import {Router} from "@ngrx/router";
import {MaterializeDirective} from "angular2-materialize";

@Component({
  selector: 'camp-new',
  directives: [MaterializeDirective],
  providers: [],
  template: require('./camp-new.component.html')
})
export class CampNewComponent {
  camp: Camp;

  constructor(private router: Router) {
    this.camp = {} as Hotel;
  }


  saveCamp() {
  }

  openCamp(camp: Camp) {
    this.router.go('/camps/' + camp.id);
  }
}
