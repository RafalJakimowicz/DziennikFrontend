import { Injectable } from '@angular/core';
import {WebTokenService} from '../token/web-token.service';
import {HttpClient} from '@angular/common/http';

export interface Attendance{
  id: number;
  lessonId: number;
  studentId: number;
  status: string;
  userId: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceApiService {

  constructor(private http: HttpClient, private token: WebTokenService) { }

  baseUrl = 'http://localhost:8080/api/private/attendances';
  header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer`
  }

  addAttendance(attendance: Attendance) {
    this.header['Authorization'] = `Bearer ${this.token.getToken()?.token}`;
    return this.http.post<Attendance>(this.baseUrl, attendance, {headers: this.header});
  }
}
