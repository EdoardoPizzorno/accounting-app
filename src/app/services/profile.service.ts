import { Injectable } from '@angular/core';
import { GetCookieOptions } from '@capacitor/core/types/core-plugins';
import { RequestsService } from './requests.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user: any = {
    uuid: "",
    username: "",
    name: "",
    surname: "",
    birthdate: "",
    address: "",
    email: "",
    phone: "",
    avatar: ""
  };

  constructor(private requestsService: RequestsService, private router: Router) {
    this.getUser();
  }

  async getUser() {
    // this.user = {
    //   uuid: "66cb1cfef8da1104165e34a8",
    //   username: "edoardopizzorno",
    //   name: "Edoardo",
    //   surname: "Pizzorno",
    //   birthdate: "24/11/2005",
    //   address: "Via Roma 1",
    //   email: "howudoing@gmail.com",
    //   phone: "1234567890",
    //   avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
    // }
    this.user = localStorage.getItem('user');
    if (JSON.parse(this.user).length == 0) {
      this.router.navigate(['/login'])
    }
  }

}
