import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';
import { ProfileService } from './profile.service';
import { BanksService } from './banks.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  public history: any = [];
  public operation: any = {};

  private bankIds: any = [];

  constructor(private requestsService: RequestsService, private profileService: ProfileService, private banksService: BanksService) {
    this.resetOperation();
  }

  async getHistory() {
    if (this.history.length === 0) {
      await this.requestsService.sendRequest('GET', 'operations', { userId: this.profileService.user._id }).catch(this.requestsService.error)
        .then(async (response: any) => {
          response.data.forEach((operation: any) => {
            if (this.bankIds.indexOf(operation.bank) === -1)
              this.bankIds.push(operation.bank);
          });

          await this.banksService.getUserBanks(this.bankIds);
          response.data.forEach((operation: any) => {
            operation.bank = this.banksService.userBanks.find((bank: any) => bank._id === operation.bank).name;
          });
          
          this.history = response.data;
        });
    }
  }

  async addOperation() {
    this.history.push(this.operation);
    console.log(this.history);
    this.resetOperation();
  }

  async deleteOperation(operation: any) {
    this.history = this.history.filter((item: any) => item !== operation);
    console.log(this.history);
  }

  resetOperation() {
    this.operation = {
      title: "",
      description: "",
      amount: "",
      bank: "",
      firstReason: "",
      secondReason: "",
      date: new Date().toISOString()
    };
  }

}
