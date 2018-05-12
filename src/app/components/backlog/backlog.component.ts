import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../services/backlog.service';
import { Bug } from '../bug/bug.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  bugs: Bug[];

  constructor(private backlogService: BacklogService) { }

  getBugs() {
    this.backlogService.getBugs().subscribe(bugs => this.bugs = bugs);
  }

  ngOnInit() {
    this.getBugs();
  }
}
