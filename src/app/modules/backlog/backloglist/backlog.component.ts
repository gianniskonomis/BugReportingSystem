import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../services/backlog.service';
import { Bug } from '../bug/bug.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  bugs: Array<Bug>;
  sortBy: string;
  isSortAsc: boolean;
  page: number;
  size: number;

  constructor(private backlogService: BacklogService) { }

  ngOnInit() {
    this.sortBy = 'title';
    this.isSortAsc = true;
    this.page = 0;
    this.size = 100;
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
