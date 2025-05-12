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

  private _userId$ = new BehaviorSubject<number | null>(null);

  readonly token$: Observable<Token | null> = this._token$.asObservable();

  readonly userId$: Observable<number | null> = this._userId$.asObservable();

  getUserId(): number | null {
    return this._userId$.value;
  }

  setUserId(user_id: number | null): void {
    this._userId$.next(user_id);
  }

  clearUserId(){
    this._userId$.next(NaN);
  }

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
