import { Injectable } from '@angular/core';
import {WebTokenService} from '../token/web-token.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface User{
  id: number;
  name: string;
  surname: string;
  email: string;
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private tokenService: WebTokenService, private http: HttpClient) { }

  header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' };
  baseUrl = 'http://localhost:8080/api/users';

  getMyUser(): Observable<User> {
    this.header["Authorization"] = 'Brearer ' + this.tokenService.getToken();
    const getUrl = `${this.baseUrl}/me`;
    return this.http.get<User>(getUrl, {headers: this.header});
  }
}
