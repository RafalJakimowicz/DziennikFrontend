import { Injectable } from '@angular/core';

export interface User{
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

  constructor() { }
}
