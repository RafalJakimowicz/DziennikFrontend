import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebTokenService} from '../token/web-token.service';
import {Observable} from 'rxjs';

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
    this.header["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkN2I0ZjUwNS1jMzQ2LTQ1ZjgtYmU4OC1kNWZhM2EwYWExNjkiLCJzdWIiOiJqayIsImlhdCI6MTc0NzA2MTY4MywiZXhwIjoxNzQ3MTQ4MDgzfQ.WqUHjX--UY_sih-8CkmKmCZwiEYvQ6PhcuuR5vZmdTI";
    //const getUrl: string = `${this.baseUrl}/my/${this.tokenService.getUserId()}`;
    const getUrl: string = `${this.baseUrl}/my/${152}`;
    return this.http.get<Group[]>(getUrl, { headers: this.header });
  }
}
