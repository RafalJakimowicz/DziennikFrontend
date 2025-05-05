import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
