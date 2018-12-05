import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/Login/login.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  userInfo: any;
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getUserInfo().subscribe((data: any) => { this.userInfo = data; });
  }
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['login']);
  }
}
