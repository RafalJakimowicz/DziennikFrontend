import { Component, OnInit } from '@angular/core';
import {Group, GroupApiService} from '../../../services/group/group-api.service';

@Component({
  selector: 'app-grades',
  imports: [],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent implements OnInit {
  groups =[1,2,3,4,5,6,7,8,9,0];
  groupsList: Group[] = [];

  constructor(private groupsService: GroupApiService) { }

  ngOnInit() {
    this.groupsService.getUserGroups().subscribe(
      {
        next: groups => {
          this.groupsList = groups;
        },
        error: error => {
          console.log(error);
          this.groupsList = [];
        }
      }
    );
  }

}
