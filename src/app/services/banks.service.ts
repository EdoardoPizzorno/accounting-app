import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  public alertButtons: any = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Confirm',
      handler: (e: any) => {
        this.addBank(e[0])
      }
    }
  ];

  public newBank: any = {
    placeholder: 'Bank',
    name: "",
    color: ""
  };

  public userBanks: any = [];

  constructor(private requestsService: RequestsService) { }

  async getUserBanks(bankIds: any) {
    await this.requestsService.sendRequest('GET', 'banks', { "IDs": bankIds }).catch(this.requestsService.error)
      .then((response: any) => {
        this.userBanks = response.data;
      });
  }

  async addBank(bank: any) {
    console.log(bank);
  }

}
