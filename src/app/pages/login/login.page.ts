import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData: any = {};

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  loginWithFingerprint() {
    location.href = '/home';
  }

}
