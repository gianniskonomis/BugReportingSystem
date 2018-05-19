import { Component, OnInit } from "@angular/core";
import { BacklogService } from "../services/backlog.service";
import { Bug } from "../bug/bug.model";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Component({
  selector: "app-backlog",
  templateUrl: "./backlog.component.html",
  styleUrls: ["./backlog.component.css"]
})
export class BacklogComponent implements OnInit {
  bugs: Array<Bug>;
  sortBy: string;
  isSortAsc: boolean;
  page: number;
  size: number;

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
      .getBugs(this.sortBy, this.isSortAsc, this.page, this.size)
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

  removeBug(id: string) {
    this.backlogService.delete(id).subscribe(response => {
      this.resolveBugs();
    });
  }
}
