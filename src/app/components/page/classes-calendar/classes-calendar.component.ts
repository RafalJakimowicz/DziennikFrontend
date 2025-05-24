import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-classes-calendar',
  imports: [CommonModule],
  templateUrl: './classes-calendar.component.html',
  styleUrls: ['./classes-calendar.component.css']
})
export class ClassesCalendarComponent {
  currentWeek: number;
  currentYear: number;
  days: string[] = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  hours: string[] = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00'
  ];

  lessons: any[] = [];

  constructor() {
    const today = new Date();
    const { week, year } = this.getWeekNumber(today);
    this.currentWeek = week;
    this.currentYear = year;
    this.loadSampleLessons();
  }

  changeWeek(offset: number) {
    const firstDayOfYear = new Date(this.currentYear, 0, 1);
    const newDate = new Date(firstDayOfYear.getTime() + (this.currentWeek - 1 + offset) * 7 * 86400000);
    const { week, year } = this.getWeekNumber(newDate);
    this.currentWeek = week;
    this.currentYear = year;
    this.loadSampleLessons();
  }

  onWeekChange(event: any) {
    const [year, week] = event.target.value.split('-W').map(Number);
    this.currentWeek = week;
    this.currentYear = year;
    this.loadSampleLessons();
  }

  loadSampleLessons() {
    this.lessons = [
      { subject: 'ASDFASFD', day: 'Poniedziałek', startTime: '08:00', endTime: '09:30' },
      { subject: 'ASDFfdfdf d fas dfasd fasdf dfASFD', day: 'Poniedziałek', startTime: '10:00', endTime: '11:30' },
      { subject: 'FGASG', day: 'Wtorek', startTime: '10:00', endTime: '11:30' },
      { subject: 'HFGH', day: 'Środa', startTime: '12:00', endTime: '14:00' },
      { subject: 'WAGAF', day: 'Czwartek', startTime: '08:00', endTime: '09:00' },
      { subject: 'SDFGSD', day: 'Piątek', startTime: '13:00', endTime: '14:30' }
    ];
  }

  getLessonsForDay(day: string) {
    return this.lessons.filter(l => l.day === day);
  }

  getTopOffset(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const totalMinutes = (hour - 8) * 60 + minute;
    return `${totalMinutes * (50 / 60)}px`;
  }

  getBlockHeight(startTime: string, endTime: string): string {
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const duration = (eh * 60 + em) - (sh * 60 + sm);
    return `${duration * (50 / 60)}px`;
  }

  getWeekNumber(date: Date): { week: number, year: number } {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return { week: weekNo, year: d.getUTCFullYear() };
  }

}

