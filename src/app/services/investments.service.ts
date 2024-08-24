import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  public investments: any[] = [];
  public investmentsByType: any[] = [];
  public investmentsGroupedByType: any[] = [];

  constructor() { }

  async getInvestments() {
    this.investments = [
      {
        title: "Stocks",
        description: "Stock market investments",
        amount: 1000,
        broker: "Trade Republic",
        type: "Stocks",
        date: "2021-06-01T00:00:00.000Z"
      },
      {
        title: "Stocks",
        description: "Stock market investments",
        amount: 500,
        broker: "Trade Republic",
        type: "Stocks",
        date: "2021-06-01T00:00:00.000Z"
      },
      {
        title: "Crypto",
        description: "Crypto market investments",
        amount: 500,
        broker: "Bybit",
        type: "Crypto",
        date: "2021-05-01T00:00:00.000Z"
      },
      {
        title: "Real Estate",
        description: "Real estate investments",
        amount: 200,
        broker: "Fineco",
        type: "Real Estate",
        date: "2021-01-01T00:00:00.000Z"
      }
    ]
    //await this.groupInvestmentsByType();
    //console.log(this.investmentsGroupedByType)
  }

  async getInvestmentsByType(type: string) {
    this.investmentsByType = this.investments.filter((investment: any) => investment.type === type);
  }

  async addInvestment(investment: any) {
    this.investments.push(investment);
    console.log(this.investments);
  }

  async deleteInvestment(investment: any) {
    this.investments = this.investments.filter((item: any) => item !== investment);
    console.log(this.investments);
  }

  async groupInvestmentsByType() {
    this.investmentsGroupedByType = this.investments.reduce((acc: any, investment: any) => {
      if (!acc[investment.type]) {
        acc[investment.type] = [];
      }
      acc[investment.type].push(investment);
      return acc;
    }, {});
  }

}
