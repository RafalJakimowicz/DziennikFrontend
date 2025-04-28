import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: any;
  username: any;
  onSubmit(){
    console.log(this.password);
    console.log(this.username);
  }

  constructor(private router: Router) {
  }

  redirectToRegister(){
    this.router.navigate(['/register']);
  }
}
