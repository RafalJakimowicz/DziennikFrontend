import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Group, GroupApiService} from '../../../services/group/group-api.service';
import {Student} from '../../../services/student/student-api.service';
import {Lesson, LessonApiService} from '../../../services/lesson/lesson-api.service';
import {Attendance, AttendanceApiService} from '../../../services/attendance/attendance-api.service';
import {WebTokenService} from '../../../services/token/web-token.service';

@Component({
  selector: 'app-presence-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './presence-table.component.html',
  styleUrls: ['./presence-table.component.css']
})
export class PresenceTableComponent implements OnInit {
  constructor(private groupsService: GroupApiService, private lessonService: LessonApiService, private token: WebTokenService, private attendanceService: AttendanceApiService) {
  }

  groups: Group[] = [];
  students: Student[] = [];
  selectedGroup: Group = this.groups[0];
  attendanceDate: string = new Date().toISOString().split('.')[0];
  selectedDate: string = this.attendanceDate.split('T')[0];
  lessonSubject: string = "";
  lessonRoom: string = "";


  submitAttendance() {
    var classesWindow: string[] = this.lessonService.getTeachingBlock()
    var lesson: Lesson = {
      id: NaN,
      startTime: classesWindow[0],
      endTime: classesWindow[1],
      groupId: this.selectedGroup.id,
      room: this.lessonRoom,
      subject: this.lessonSubject
    }

    this.lessonService.addLesson(lesson).subscribe(
      {
        next: lesson => {
          for(const student of this.students) {
            var attendance: Attendance = {
              id: NaN,
              lessonId: lesson.id,
              date: classesWindow[0],
              status: student.status,
              studentId: student.id,
              userId: this.token.getUserId()
            };
            this.attendanceService.addAttendance(attendance).subscribe(
              {
                next: attendance => {},
                error: err => {console.log(err)}
              }
            );
          }
        },
        error: err => {console.log(err)}
      }
    );


    console.log('Zatwierdzono obecność:', {
      group: this.selectedGroup,
      date: this.attendanceDate,
      students: this.students
    });
  }

  onOptionChanged($event: Event) {
    console.log(this.selectedGroup);
    this.groupsService.getStudentsInGroup(this.selectedGroup.id).subscribe(
      {
        next: result => {
          this.students = result;
        },
        error: error => {
          console.log(error);
        }
      }
    )
  }

  ngOnInit() {
    this.groupsService.getUserGroups().subscribe(
      {
        next: groups => {
          this.groups = groups;
          this.selectedGroup = groups[0];
        },
        error: error => {
          console.log(error);
          this.groups = [];
        }
      }
    );
  }
}
