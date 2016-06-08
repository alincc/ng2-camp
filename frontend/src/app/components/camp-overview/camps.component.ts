import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Camp} from "../../model/backend-typings";
import {CampService} from '../../shared/camp.service';

@Component({
  selector: 'camps',
  directives: [],
  template: require('./camps.component.html')
})
export class CampsComponent implements OnInit{
  camps: Observable<Camp[]>;

  constructor(private campService: CampService) {
  }

  ngOnInit() {
    this.camps = this.campService.getCamps();
  }
}
