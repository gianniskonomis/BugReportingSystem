import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Bug } from '../components/bug/bug.model';

@Injectable()
export class BacklogService {

  private bugsUrl = 'http://localhost:3001/bugs';

  constructor(private http: HttpClient) { }

  /** GET Bugs from the server */
  getBugs(sortBy?: string, type?: string): Observable<Bug[]> {

    if (sortBy && type) {
      this.bugsUrl = this.bugsUrl + '?sort=' + sortBy + ',' + type;
    }

    return this.http.get<Bug[]>(this.bugsUrl);
  }

}
