import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../../services/backlog.service';
import { Bug } from '../bug/bug.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  bugs: Array<Bug>;
  sortBy: string = "title";
  isSortAsc: boolean = true;
  pange: number = 0;
  size: number = 10;

  constructor(private backlogService: BacklogService) { }

  ngOnInit() {
    this.getBugs(this.sortBy);
  }

  getBugs(sortBy) {
    this.sortBy = sortBy;
    this.isSortAsc = !this.isSortAsc;
    this.backlogService.getBugs(this.sortBy, this.isSortAsc).subscribe(response => {
      this.bugs = response;
    });
  }
}
