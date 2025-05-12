import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-presence-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './presence-table.component.html',
  styleUrls: ['./presence-table.component.css']
})
export class PresenceTableComponent {
  groups: string[] = ['1A', '1B', '2A'];
  selectedGroup: string = this.groups[0];
  selectedDate: string = new Date().toISOString().split('T')[0];

  students = [
    { name: 'Jan Kowalski', status: 'obecny' },
    { name: 'Anna Nowak', status: 'obecny' },
    { name: 'Piotr Wiśniewski', status: 'obecny' }
  ];

  submitAttendance() {
    console.log('Zatwierdzono obecność:', {
      group: this.selectedGroup,
      date: this.selectedDate,
      students: this.students
    });
  }
}
