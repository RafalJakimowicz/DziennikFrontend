import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../user/user-api.service';
import { WebTokenService, Token } from '../token/web-token.service';
import {Observable} from 'rxjs';


export interface AuthDTO{
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private baseUrl = "http://localhost:8080/api/public/auth";

  constructor(private http: HttpClient, private tokenService: WebTokenService) { }

  loginUser(user_login: string, user_password: string) : Observable<Token>{
    const payload:  AuthDTO = {
      login: user_login,
      password: user_password,
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Token>(`${this.baseUrl}/login`, payload, { headers: headers });
  }

  registerUser(user_firstName: string,
               user_lastName: string,
               user_email: string,
               user_login: string,
               user_password: string,): Observable<Token>{
    const payload: User = {
      name: user_firstName,
      surname: user_lastName,
      email: user_email,
      login: user_login,
      password: user_password,
    }
    console.log(payload);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Token>(`${this.baseUrl}/register`, payload, { headers: headers });
  }
}
