import { Component } from '@angular/core';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {PresenceTableComponent} from '../presence-table/presence-table.component';
import {ClassesCalendarComponent} from '../classes-calendar/classes-calendar.component';
import {GradesComponent} from '../grades/grades.component';
import {MenuComponent} from '../menu/menu.component';
import {WebTokenService} from '../../../services/token/web-token.service';
import {Router} from '@angular/router';

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
  constructor(private token: WebTokenService, private router: Router) {
    if(token.getUserId() === 0){
      router.navigate(['/']);
    }
  }


}
