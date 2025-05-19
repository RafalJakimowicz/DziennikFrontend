import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {WebTokenService} from '../../../services/token/web-token.service';
import {AuthApiService} from '../../../services/auth/auth-api.service';
import {UserApiService} from '../../../services/user/user-api.service';

interface Student {
  id: number;
  name: string;
  grades: number[];
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent {

  constructor(private router: Router, private tokenService: WebTokenService, private authService: AuthApiService, private userService: UserApiService) { }

  groups: string[] = ['1A', '1B', '2A'];
  selectedGroup: string = '1A';

  students: Student[] = [
    { id: 1, name: 'Jan Kowalski', grades: [4, 3, 5, 6] },
    { id: 2, name: 'Anna Nowak', grades: [5, 5, 4, 4] },
    { id: 3, name: 'Piotr Wiśniewski', grades: [3, 4, 3, 3] },
    { id: 4, name: 'Maria Dąbrowska', grades: [6, 5, 6, 5] },
    { id: 5, name: 'Tomasz Wójcik', grades: [4, 2] },
    { id: 6, name: 'Agnieszka Kaczmarek', grades: [3, 5, 5, 5] }
  ];

  redirectToAddGrades(){
    this.router.navigate(['/add-grade']);
  }
}
