import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson, LessonApiService } from '../../../services/lesson/lesson-api.service';

/** Extra props needed at render time */
interface DisplayLesson extends Lesson {
  start: Date;
  end: Date;
  week: number;
  year: number;
  dow: number;      // 1 = Mon … 5 = Fri
}

@Component({
  standalone: true,
  selector: 'app-classes-calendar',
  imports: [CommonModule],
  templateUrl: './classes-calendar.component.html',
  styleUrls: ['./classes-calendar.component.css'],
})
export class ClassesCalendarComponent {
  /* ───────────── CONSTANTS ───────────── */
  readonly firstHour = 8;          // timetable starts 08:00
  readonly lastHour  = 19;         // … ends 19:00 (exclusive)
  readonly pxPerHour = 120;        // horizontal pixels for 60 min
  readonly rowHeight = 60;         // vertical pixels per day row

  /* ───────────── STATE ───────────── */
  currentWeek!: number;
  currentYear!: number;

  readonly days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  readonly hours = Array.from(
    { length: this.lastHour - this.firstHour },
    (_, i) => `${String(this.firstHour + i).padStart(2, '0')}:00`
  );

  lessons: DisplayLesson[] = [];

  constructor(private lessonApi: LessonApiService) {
    const today = new Date();
    const { week, year } = this.getWeekNumber(today);
    this.currentWeek = week;
    this.currentYear = year;
    this.loadLessons();
  }

  /* ───────────── PUBLIC ───────────── */
  changeWeek(offset: number): void {
    const firstDay = new Date(this.currentYear, 0, 1);
    const newDate  = new Date(firstDay.getTime() + (this.currentWeek - 1 + offset) * 7 * 86_400_000);
    const { week, year } = this.getWeekNumber(newDate);
    this.currentWeek = week;
    this.currentYear = year;
  }

  onWeekChange(ev: Event): void {
    const [year, week] = (ev.target as HTMLInputElement).value.split('-W').map(Number);
    this.currentYear = year;
    this.currentWeek = week;
  }

  /** lessons for visible week + weekday (1=Mon) */
  getLessonsForDay(dow: number): DisplayLesson[] {
    return this.lessons.filter(
      l => l.year === this.currentYear && l.week === this.currentWeek && l.dow === dow
    );
  }

  /** left offset in px from timetable start (08:00) */
  getLeft(date: Date): string {
    const minutes = (date.getHours() - this.firstHour) * 60 + date.getMinutes();
    return `${(minutes * this.pxPerHour) / 60}px`;
  }

  /** width in px */
  getWidth(start: Date, end: Date): string {
    const minutes = (end.getTime() - start.getTime()) / 60000;
    return `${(minutes * this.pxPerHour) / 60}px`;
  }

  /* ───────────── PRIVATE ───────────── */
  private loadLessons(): void {
    this.lessonApi.getLessons().subscribe(raw => {
      this.lessons = raw.map(l => {
        const start = new Date(l.startTime);
        const end   = new Date(l.endTime);
        const { week, year } = this.getWeekNumber(start);
        return { ...l, start, end, week, year, dow: start.getDay() || 7 };
      });
    });
  }

  /** ISO-8601 week number (Mon-based) */
  private getWeekNumber(date: Date): { week: number; year: number } {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((+d - +yearStart) / 86_400_000 + 1) / 7);
    return { week: weekNo, year: d.getUTCFullYear() };
  }
}
