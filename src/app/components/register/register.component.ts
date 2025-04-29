import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {WebTokenService} from '../../services/token/web-token.service';
import {AuthApiService} from '../../services/auth/auth-api.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private tokenService: WebTokenService, private authService: AuthApiService) {}

  firstName: any;
  lastName: any;
  password: any;
  username: any;
  email: any;

  onSubmit() {
    this.authService.registerUser(
      this.firstName,
      this.lastName,
      this.email,
      this.username,
      this.password
    ).subscribe({
      next: token => {
        this.tokenService.setToken(token);
        console.log('After register:', this.tokenService.getToken());
      },
      error: error => {
        console.log(error);
      }
    });
  }

  redirectTologin() {
    this.router.navigate(['/login']);
  }
}
