import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebTokenService } from '../../token/web-token.service';

export interface Grade {
  id: number;
  studentId: number;
  userId: number;
  groupId: number;
  score: string;
  comment: string;
  date: string
}

@Injectable({
  providedIn: 'root'
})
export class GradeApiService {
  private baseUrl = 'http://localhost:8080/api/private/grades';

  constructor(private http: HttpClient, private tokenService: WebTokenService) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()?.token}`
    });
  }

  public addGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.baseUrl, grade, {
      headers: this.getAuthHeaders()
    });
  }

  public updateGrade(id: number, grade: Partial<Grade>): Observable<Grade> {
    return this.http.put<Grade>(`${this.baseUrl}/${id}`, grade, {
      headers: this.getAuthHeaders()
    });
  }

  public deleteGrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  public getGradesByGroup(groupId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`http://localhost:8080/api/private/groups/${groupId}/grades`, {
      headers: this.getAuthHeaders()
    });
  }
}
