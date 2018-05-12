import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Bug,BugModel } from '../modules/backlog/bug/bug.model';

@Injectable()
export class BacklogService {

  private bugEndPoint = 'http://localhost:3001/bugs';

  constructor(private http: HttpClient) { }

  /** GET Bugs from the server */

  getBugs(
    sortBy: string,
    isSortAsc: boolean,
    page: number = 0,
    size: number = 10
  ): Observable<Array<Bug>> {
    const sortType = isSortAsc ? "asc" : "desc";

    let params = new HttpParams();
    params = params.append("sort", `${sortBy},${sortType}`);
    params = params.append("page", page.toString());
    params = params.append("size", size.toString());

    return this.http.get<Array<Bug>>(this.bugEndPoint, { params: params });
  }

  saveBug(model: BugModel): Observable<Bug> {
    return this.http.post<Bug>(this.bugEndPoint, model);
  }
}
