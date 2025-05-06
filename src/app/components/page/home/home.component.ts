import { Component } from '@angular/core';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {PresenceTableComponent} from '../presence-table/presence-table.component';
import {ClassesCalendarComponent} from '../classes-calendar/classes-calendar.component';
import {GradesComponent} from '../grades/grades.component';
import {MenuComponent} from '../menu/menu.component';

@Component({
  selector: 'app-home',
  imports: [
    NgSwitch,
    PresenceTableComponent,
    NgSwitchCase,
    ClassesCalendarComponent,
    GradesComponent,
    MenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  activeTab: 'menu' | 'grades' | 'presence' | 'calendar' = 'menu';

  setActive(tab: 'menu' | 'grades' | 'presence' | 'calendar'){
    this.activeTab = tab;
  }
}
