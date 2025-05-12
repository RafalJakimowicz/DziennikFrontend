import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthApiService } from '../../services/auth/auth-api.service';
import { WebTokenService} from '../../services/token/web-token.service';
import {UserApiService} from '../../services/user/user-api.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private tokenService: WebTokenService, private authService: AuthApiService, private userService: UserApiService) { }

  password: any;
  username: any;

  onSubmit(){
    console.log(this.password);
    console.log(this.username);
    this.authService
      .loginUser(this.username, this.password)
      .subscribe({
        next: token => {
          this.tokenService.setToken(token);
          // now the subject has the new token…
          console.log('After login:', this.tokenService.getToken());
          this.userService.getMyUser().subscribe({next: user => {this.tokenService.setUserId(user.id)}})
          this.redirectToHome()
        },
        error: err => console.error(err)
      });
  }

  redirectToHome(){
    this.router.navigate(['/home']);
  }


  redirectToRegister(){
    this.router.navigate(['/register']);
  }
}
