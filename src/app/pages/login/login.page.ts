import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData: any = {};

  constructor(private requestsService: RequestsService, private profileService: ProfileService, private router: Router) { }

  ngOnInit() {
  }

  async loginWithEmail() {
    await this.requestsService.sendRequest('POST', 'login', this.loginData).catch(this.requestsService.error)
      .then((response: any) => {
        this.profileService.setUser(response.data.user);
        this.router.navigate(['/home']);
      });
  }

  loginWithGoogle() {
    console.log('Login with Google');
  }

}
