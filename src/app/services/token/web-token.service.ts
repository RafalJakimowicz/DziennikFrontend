import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebTokenService {

  constructor() { }

  private _token$ = new BehaviorSubject<Token | null>(null);

  readonly token$: Observable<Token | null> = this._token$.asObservable();

  getToken(): Token | null{
    return this._token$.value;
  }

  setToken(token: Token){
    this._token$.next(token);
  }

  clearToken(){
    this._token$.next(null);
  }
}
