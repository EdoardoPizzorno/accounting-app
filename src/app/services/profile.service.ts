import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user: any = {
    _id: "",
    username: "",
    name: "",
    surname: "",
    birthdate: "",
    address: "",
    email: "",
    phone: "",
    avatar: ""
  };

  constructor(private router: Router) {
    this.getUser();
  }

  async getUser() {
    let condition: boolean = localStorage.getItem('accounting-app-token') !== null && localStorage.getItem('accounting-app-user') !== null && localStorage.getItem('accounting-app-token') !== "undefined" && localStorage.getItem('accounting-app-user') !== "undefined";
    if (condition) {
      this.user = JSON.parse(localStorage.getItem('accounting-app-user')!);
    }
  }

  async setUser(user: any) {
    localStorage.setItem('accounting-app-user', JSON.stringify(user));
    this.user = user;
  }

  async logout() {
    localStorage.removeItem('accounting-app-token');
    localStorage.removeItem('accounting-app-user');
    window.location.href = "/login";
  }

}
