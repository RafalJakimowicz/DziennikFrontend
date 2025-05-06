import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Output() tabChange = new EventEmitter<'grades' | 'presence' | 'calendar'>();

  switchTabs(tab: 'grades' | 'presence' | 'calendar'){
    this.tabChange.emit(tab);
  }
}
