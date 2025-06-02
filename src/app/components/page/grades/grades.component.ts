import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {WebTokenService} from '../../../services/token/web-token.service';
import {AuthApiService} from '../../../services/auth/auth-api.service';
import {UserApiService} from '../../../services/user/user-api.service';
import {Group, GroupApiService} from '../../../services/group/group-api.service';
import {Student} from '../../../services/student/student-api.service';
import {Grade, GradeApiService} from '../../../services/grade/grade-api/grade-api.service';

export interface StudentWithGrade{
  student: Student;
  gradeOfStudent: Grade[];
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  constructor(private router: Router, private gradeService: GradeApiService,private tokenService: WebTokenService, private authService: AuthApiService, private userService: UserApiService, private groupService: GroupApiService) { }
  studentAndGrade: StudentWithGrade[] = [];
  groups: Group[] = [];
  selectedGroup = this.groups[0];

  allGrades: Grade[] = [];

  students: Student[] = [];

  redirectToAddGrades(){
    this.router.navigate(['/add-grade']);
  }

  ngOnInit() {
    this.groupService.getUserGroups().subscribe(
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

  onOptionChanged($event: Event) {
    if (!this.selectedGroup) return;
    this.studentAndGrade = []

    var studentsGrades: Grade[] = [];
    console.log(this.selectedGroup);
    this.groupService.getStudentsInGroup(this.selectedGroup.id).subscribe(
      {
        next: result => {
          this.students = result;
          this.gradeService.getGradesByGroup(this.selectedGroup.id).subscribe(
            {
              next: r => {
                studentsGrades = r;
                for (var i = 0; i < this.students.length; i++) {
                  let studentwithgrade = {
                    student: this.students[i],
                    gradeOfStudent: new Array<Grade>()
                  }
                  for(var j = 0; j < studentsGrades.length; j++) {
                    if(this.students[i].id == studentsGrades[j].studentId){
                      studentwithgrade.gradeOfStudent.push(studentsGrades[j]);
                    }
                  }
                  this.studentAndGrade.push(studentwithgrade);
                }
              },
              error: error => {
                console.log(error);
              }
            }
          )
        },
        error: error => {
          console.log(error);
        }
      }
    )
  }
}
