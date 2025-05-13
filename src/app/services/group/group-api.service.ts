import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebTokenService} from '../token/web-token.service';
import {Observable} from 'rxjs';
import { Student} from '../student/student-api.service';

export interface Group {
  id: number;
  coursePartId: number;
  code: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {
  header = {
    "Content-Type": "application/json",
    "Authorization": "Bearer"
  }

  baseUrl: string = 'http://localhost:8080/api/private/groups';

  constructor(private http: HttpClient, private tokenService: WebTokenService) {
    //this.header["Authorization"] = "Bearer " + tokenService.getToken();
  }

  public getUserGroups(): Observable<Group[]> {
    this.header["Authorization"] = `Bearer ${this.tokenService.getToken()?.token}`;
    //const getUrl: string = `${this.baseUrl}/my/${this.tokenService.getUserId()}`;
    const getUrl: string = `${this.baseUrl}/my/${this.tokenService.getUserId()}`;
    return this.http.get<Group[]>(getUrl, { headers: this.header });
  }

  public getStudentsInGroup(groupId: number): Observable<Student[]>{
    this.header["Authorization"] = `Bearer ${this.tokenService.getToken()?.token}`;
    const getUrl: string = `${this.baseUrl}/${groupId}/students`;
    return this.http.get<Student[]>(getUrl, { headers: this.header });
  }
}
