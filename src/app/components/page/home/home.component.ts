import { Component } from '@angular/core';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {PresenceTableComponent} from '../presence-table/presence-table.component';
import {ClassesCalendarComponent} from '../classes-calendar/classes-calendar.component';
import {GradesComponent} from '../grades/grades.component';
import {MenuComponent} from '../menu/menu.component';
import {WebTokenService} from '../../../services/token/web-token.service';

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
    this.token.setToken({token: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNjcwYTI3Yy04OTgzLTRkY2YtYjY3My00ODEyZGE0ZTBiZTYiLCJzdWIiOiJqayIsImlhdCI6MTc0NzA4MjcyNiwiZXhwIjoxNzQ3MTY5MTI2fQ.1bDoEtO46J-uOHaHTr8E5j9zvfmSh2QJjNmucM6lVw8"})
  }
  constructor(private token: WebTokenService) {
    token.setToken({token: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNjcwYTI3Yy04OTgzLTRkY2YtYjY3My00ODEyZGE0ZTBiZTYiLCJzdWIiOiJqayIsImlhdCI6MTc0NzA4MjcyNiwiZXhwIjoxNzQ3MTY5MTI2fQ.1bDoEtO46J-uOHaHTr8E5j9zvfmSh2QJjNmucM6lVw8"})
  }


}
