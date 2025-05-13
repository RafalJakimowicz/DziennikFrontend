import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  surname: string;
  index: number;
  year: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {

  constructor() { }
}
