import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/distinct";
import {Camp} from "../../model/backend-typings";
import {MaterializeDirective} from "angular2-materialize/dist/index";

@Component({
  selector: 'camps',
  directives: [MaterializeDirective],
  providers: [],
  pipes: [],
  template: require('./camps.component.html')
})
export class CampsComponent {
  camps: Observable<Camp[]>;
}
