import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Group, GroupApiService } from '../../../services/group/group-api.service';
import { Student } from '../../../services/student/student-api.service';
import { WebTokenService } from '../../../services/token/web-token.service';
import { Grade, GradeApiService } from '../../../services/grade/grade-api/grade-api.service';

@Component({
  selector: 'app-add-grade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.css']
})
export class AddGradeComponent implements OnInit {
  groups: Group[] = [];
  students: Student[] = [];
  selectedGroup: Group | null = null;
  date: string = new Date().toISOString().split('.')[0];
  selectedDate: string = this.date.split('T')[0];
  gradeComment: string = '';
  grades: number[] = [];

  constructor(
    private groupsService: GroupApiService,
    private gradeService: GradeApiService,
    private token: WebTokenService
  ) {}

  ngOnInit(): void {
    this.groupsService.getUserGroups().subscribe({
      next: (groups: Group[]) => {
        this.groups = groups;
        if (groups.length > 0) {
          this.selectedGroup = groups[0];
          this.onOptionChanged();
        }
      },
      error: (err: any) => {
        console.error('Błąd pobierania grup:', err);
      }
    });
  }

  onOptionChanged(): void {
    if (!this.selectedGroup) return;

    this.groupsService.getStudentsInGroup(this.selectedGroup.id).subscribe({
      next: (students: Student[]) => {
        this.students = students;
        this.grades = new Array(students.length).fill(0);
      },
      error: (err: any) => {
        console.error('Błąd pobierania uczniów:', err);
      }
    });
  }

  coerceNumber(idx: number, val: string | number): void {
    // valueAsNumber would be NaN on empty input; default to 0 or leave undefined
    this.grades[idx] = Number(val) || 0;
  }

  submitGrade(): void {
    if (!this.selectedGroup) return;

    const payload: Grade[] = this.students.map((student, index) => ({
      id: NaN,
      studentId: student.id,
      userId: this.token.getUserId(),
      groupId: this.selectedGroup!.id,
      score: this.grades[index].toFixed(2),
      comment: this.gradeComment,
      date: this.date
    }));

    console.log(this.grades);

    for (const grade of payload) {
      this.gradeService.addGrade(grade).subscribe({
        next: (res: any) => {},
        error: (err: any) => console.error('Błąd zapisu oceny:', err)
      });
    }

    console.log('Zapisano oceny:', payload);
  }
}
