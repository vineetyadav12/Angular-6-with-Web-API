import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/Login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError = false;
  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  OnSubmit(email, password) {
    this._loginService.userAuthentication(email, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      this.router.navigate(['home']);
    },
      (err: HttpErrorResponse) => { this.isLoginError = true; });
  }
}
