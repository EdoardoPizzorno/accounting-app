import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  public history: any = [];
  public operation: any = {};

  constructor(private requestsService: RequestsService, private profileService: ProfileService) {
    this.resetOperation();
  }

  async getHistory() {
    if (this.history.length === 0) {
      await this.requestsService.sendRequest('GET', 'operations', { userId: this.profileService.user._id }).catch(this.requestsService.error)
        .then(async (response: any) => {
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
