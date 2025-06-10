import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebTokenService} from '../token/web-token.service';
import {Observable} from 'rxjs';

export interface Lesson{
  id: number;
  groupId: number;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
}

@Injectable({
  providedIn: 'root'
})
export class LessonApiService {
  baseUrl = 'http://localhost:8080/api/private/lessons';
  header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer`
  }

  constructor(private http: HttpClient, private token: WebTokenService ) { }

  /**
   * Returns `[blockStartISO, blockEndISO]` for the 1.5 h block that
   * either contains the given time or immediately follows a break.
   *
   * @param currentTime  A Date in *local* time (not UTC). Defaults to now.
   */
  getTeachingBlock(
    currentTime: Date = new Date()
  ): [string, string] {
    const MS_PER_MIN = 60_000;
    const BLOCK_MIN  = 105;
    const BREAK_MIN  = 15;
    const CYCLE_MIN  = BLOCK_MIN + BREAK_MIN;  // 120

    const anchor = new Date(currentTime);
    anchor.setHours(7, 30, 0, 0);              // 07:30:00.000 local time

    // If the provided time is *before* 07:30, pretend we're exactly at 07:30
    // (so we’ll return the first block).
    const diffMin = Math.max(
      0,
      Math.floor((currentTime.getTime() - anchor.getTime()) / MS_PER_MIN)
    );

    const posInCycle = diffMin % CYCLE_MIN;

    let blockStart = new Date(currentTime);

    if (posInCycle < BLOCK_MIN) {
      // We're *inside* a teaching block.
      const minutesIntoBlock = posInCycle;
      blockStart.setTime(
        currentTime.getTime() - minutesIntoBlock * MS_PER_MIN
      );
    } else {
      // We're in the 15‑minute break → skip forward to next block start.
      const minutesUntilNextBlock = CYCLE_MIN - posInCycle;
      blockStart.setTime(
        currentTime.getTime() + minutesUntilNextBlock * MS_PER_MIN
      );
    }

    const blockEnd = new Date(blockStart.getTime() + BLOCK_MIN * MS_PER_MIN);

    // Return ISO 8601 strings (always ends with “Z” because it’s UTC);
    // remove “Z” if you prefer local‑time strings such as 2025‑05‑12T09:00:00+02:00.
    return [blockStart.toISOString(), blockEnd.toISOString()];
  }

  addLesson(lesson: Lesson): Observable<Lesson> {
    this.header['Authorization'] = `Bearer ${this.token.getToken()?.token}`;
    return this.http.post<Lesson>(this.baseUrl, lesson, {headers: this.header})
  }

  getLessons(): Observable<Lesson[]> {
    this.header['Authorization'] = `Bearer ${this.token.getToken()?.token}`;
    return this.http.get<Lesson[]>(this.baseUrl, {headers: this.header});
  }
}
