import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  public history: any = [];
  public operation: any = {};

  constructor() {
    this.resetOperation();
  }

  getHistory() {
    return this.history;
  }

  addOperation() {
    this.history.push(this.operation);
    console.log(this.history);
    this.resetOperation();
  }

  deleteOperation(operation: any) {
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
