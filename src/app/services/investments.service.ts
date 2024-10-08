import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  public newInvestment: any = {};
  public investments: any[] = [];
  public investmentsByType: any[] = [];
  public investmentsGroupedByType: any[] = [];

  constructor(private requestsService: RequestsService, private profileService: ProfileService) {
    this.resetNewInvestment();
  }

  async getInvestments() {
    if (this.investments.length === 0) {
      await this.requestsService.sendRequest('GET', 'investments', { userId: this.profileService.user._id }).catch(this.requestsService.error)
        .then(async (response: any) => {
          this.investments = response.data;
          await this.groupInvestmentsByType();
        });
    }
  }

  async getInvestmentsByType(type: string) {
    if (this.investments.length === 0)
      await this.getInvestments();
    this.investmentsByType = this.investments.filter((investment: any) => investment.type === type);
  }

  async addInvestment() {
    this.investments.push(this.newInvestment);
    console.log(this.investments);
  }

  async deleteInvestment(investment: any) {
    this.investments = this.investments.filter((item: any) => item !== investment);
    console.log(this.investments);
  }

  async groupInvestmentsByType() {
    for (let investment of this.investments) {
      let index = this.investmentsGroupedByType.findIndex((item: any) => item.type === investment.type);
      if (index === -1) {
        this.investmentsGroupedByType.push({
          type: investment.type,
          total: investment.amount,
          assets: [investment.ticker]
        });
      } else {
        this.investmentsGroupedByType[index].total += investment.amount;
        this.investmentsGroupedByType[index].assets.push(investment.ticker);
        this.investmentsGroupedByType[index].assets = this.investmentsGroupedByType[index].assets.join(', ');
      }
    }
  }

  private resetNewInvestment() {
    this.newInvestment = {
      ticker: "",
      notes: "",
      amount: "",
      quantity: "",
      broker: "",
      type: "",
      date: new Date().toISOString(),
      user: ""
    };
  }

}
