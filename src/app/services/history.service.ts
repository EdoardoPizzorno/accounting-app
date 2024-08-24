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

  async getHistory() {
    this.history = [
      {
        title: "Salary",
        description: "Monthly salary",
        amount: 1000,
        bank: "Bank of America",
        firstReason: "Salary",
        secondReason: "Income",
        date: new Date().toISOString()
      },
      {
        title: "Rent",
        description: "Monthly rent",
        amount: -500,
        bank: "Bank of America",
        firstReason: "Rent",
        secondReason: "Expense",
        date: new Date().toISOString()
      },
      {
        title: "Groceries",
        description: "Monthly groceries",
        amount: -200,
        bank: "Bank of America",
        firstReason: "Groceries",
        secondReason: "Expense",
        date: new Date().toISOString()
      }
    ]
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
