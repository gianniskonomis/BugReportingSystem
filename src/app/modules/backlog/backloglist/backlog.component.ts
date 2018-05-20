import { Component, OnInit } from "@angular/core";
import { BacklogService } from "../services/backlog.service";
import { BugModel } from "../bug/bug.model";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Component({
  selector: "app-backlog",
  templateUrl: "./backlog.component.html",
  styleUrls: ["./backlog.component.css"]
})
export class BacklogComponent implements OnInit {
  bugs: Array<BugModel>;
  sortBy: string;
  isSortAsc: boolean;
  page: number;
  size: number;

  titleFilter: string;
  priorityFilter: string;
  reporterFilter: string;
  statusFilter: string;

  constructor(private backlogService: BacklogService, private router: Router) {}

  ngOnInit() {
    this.sortBy = "title";
    this.isSortAsc = true;
    this.page = 0;
    this.size = 3;
    this.getBugs(this.sortBy);
  }

  getBugs(sortBy) {
    this.sortBy = sortBy;
    this.isSortAsc = !this.isSortAsc;
    this.resolveBugs();
  }

  private resolveBugs() {
    this.backlogService
      .getBugs(
        this.sortBy,
        this.isSortAsc,
        this.page,
        this.size,
        this.titleFilter,
        this.priorityFilter,
        this.reporterFilter,
        this.statusFilter
      )
      .subscribe(response => {
        this.bugs = response;
      });
  }

  onPageChanged(upPageByOne) {
    if (upPageByOne) {
      this.page++;
    } else {
      this.page--;
    }
    this.resolveBugs();
  }

  onPageSizeChanged(pageSizeValue) {
    this.size = pageSizeValue;
    this.resolveBugs();
  }

  onAdvancedSearchStarted(params) {
    this.titleFilter = params.title;
    this.priorityFilter = params.priority;
    this.reporterFilter = params.reporter;
    this.statusFilter = params.status;
    this.resolveBugs();
  }

  removeBug(id: string) {
    this.backlogService.delete(id).subscribe(response => {
      this.resolveBugs();
    });
  }

}
