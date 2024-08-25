import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  public history: any = [];
  public operation: any = {};

  constructor(private requestsService: RequestsService) {
    this.resetOperation();
  }

  async getHistory() {
    if (this.history.length === 0) {
      this.history = (await this.requestsService.sendRequest('GET', 'operations', { userId: "66cb1cfef8da1104165e34a8" })).data;
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
