import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AlertController, ToastController } from '@ionic/angular';
import { BanksService } from './banks.service';
import { ApiAVService } from './api.service';
import { Router } from '@angular/router';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { ChartService } from './chart.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  public newInvestment: any = {};
  public investments: any[] = [];

  public investmentTypes: any[] = [];

  private investmentsGroupedByTypeTEMP: any[] = [];
  private investmentsGroupedByAssetTEMP: any[] = [];
  public investmentsGroupedByAsset: any[] = [];
  public investmentsGroupedByType: any[] = [];

  constructor(private dataService: DataService, private alertController: AlertController, private banksService: BanksService, private chartsService: ChartService, private apiService: ApiAVService, private router: Router, private toastController: ToastController) {
    this.resetNewInvestment();
  }

  async getInvestments() {
    await this.dataService.get("investments").then(async (response: any) => {
      this.investments = response;
    }).catch((error: any) => {
      console.error("Error fetching investments:", error);
    });
  }

  async getInvestmentTypes() {
    await this.dataService.get("investmentTypes").then((response: any) => {
      this.investmentTypes = response;
    }).catch((error: any) => {
      console.error("Error fetching investment types:", error);
    });
  }

  add() {
    if (!this.checkFields()) {
      this.alertController.create({
        header: 'Error',
        message: 'Please fill in all fields.',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    } else {
      // FORMATTAZIONE TICKER / VALUTE
      if (this.newInvestment.ticker) {
        this.newInvestment.ticker = this.newInvestment.ticker.toUpperCase();
      }
      if (this.newInvestment.first_currency) {
        this.newInvestment.first_currency = this.newInvestment.first_currency.toUpperCase();
      }
      if (this.newInvestment.second_currency) {
        this.newInvestment.second_currency = this.newInvestment.second_currency.toUpperCase();
      }
      // RICHIESTA POST INVESTMENT
      this.dataService.post("investments", this.newInvestment).then((response: any) => {
        let newInvestment = response;
        // RICHIESTA GET BANK
        this.dataService.get("banks", { id: this.newInvestment.broker }).then(async (response: any) => {
          newInvestment.broker = response[0];

          this.investments.push(newInvestment);
          this.investments.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });

          let brokerData = this.banksService.banks.filter((item: any) => {
            return item.id === this.newInvestment.broker;
          });

          if (brokerData && brokerData.length > 0) {
            let newAvailableBalance = Math.round((parseFloat(brokerData[0].availableBalance || 0) - parseFloat(this.newInvestment.init_amount || 0)) * 100) / 100;
            let newInvestedBalance = Math.round((parseFloat(brokerData[0].investedBalance || 0) + this.newInvestment.init_amount) * 100) / 100;

            // RICHIESTA UPDATE BANK
            this.dataService.update("banks", { id: this.newInvestment.broker, availableBalance: newAvailableBalance, investedBalance: newInvestedBalance })
              .then(async () => {

                await this.banksService.getBanks();
                await this.groupInvestments();

                this.resetNewInvestment();
                this.router.navigate(['/investments']);
              }).catch((error: any) => {
                console.error("Error updating broker balance:", error);
              });
          }

          this.toastController.create({
            message: 'Investment added successfully!',
            duration: 2000,
            position: 'top'
          }).then(toast => toast.present());
        }).catch((error: any) => {
          console.error("Error fetching broker details:", error);
        });
      }).catch((error: any) => {
        console.error("Error adding investment:", error);
      });
    }
  }

  delete(currentPrice: number, operation: any) {
    this.alertController.create({
      header: 'Delete Investment',
      message: 'Are you sure you want to delete this investment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            await this.dataService.delete("investments", { id: operation.id }).then(async (response: any) => {
              await this.dataService.get("banks", { id: operation.broker.id }).then(async (response: any) => {
                let newAvailableBalance: number = operation.init_amount + parseFloat(response[0].availableBalance || 0);
                let newInvestedBalance: number = Math.round((parseFloat(response[0].investedBalance || 0) - (operation.quantity * currentPrice)) * 100) / 100;

                await this.dataService.update("banks", { id: operation.broker.id, availableBalance: newAvailableBalance, investedBalance: newInvestedBalance })
                  .then(async () => {
                    this.investments = this.investments.filter((item: any) => item.id !== operation.id);

                    await this.banksService.getBanks();
                    await this.groupInvestments();

                    this.router.navigate(['/investments']);

                    this.toastController.create({
                      message: 'Investment deleted successfully!',
                      duration: 2000,
                      position: 'top'
                    }).then(toast => toast.present());

                  }).catch((error: any) => {
                    console.error("Error updating broker balance:", error);
                  });
              }
              ).catch((error: any) => {
                console.error("Error fetching broker details:", error);
              })
            }).catch((error: any) => {
              console.error("Error deleting investment:", error);
            });
          }
        }
      ]
    }).then(alert => alert.present());

  }

  convert(currentPrice: number, operation: any) {
    this.alertController.create({
      header: 'Close Investment',
      message: 'Are you sure this investment is closed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Close',
          handler: async () => {
            this.dataService.post("closedInvestments", operation).then(async (response: any) => {
              await this.dataService.delete("investments", { id: operation.id }).then(async (response: any) => {
                await this.dataService.get("banks", { id: operation.broker.id }).then(async (response: any) => {
                  let newAvailableBalance: number = Math.round((parseFloat(response[0].availableBalance || 0) + (operation.quantity * currentPrice)) * 100) / 100;
                  let newInvestedBalance: number = Math.round((parseFloat(response[0].investedBalance || 0) - (operation.quantity * currentPrice)) * 100) / 100;

                  await this.dataService.update("banks", { id: operation.broker.id, availableBalance: newAvailableBalance, investedBalance: newInvestedBalance })
                    .then(async () => {
                      this.investments = this.investments.filter((item: any) => item.id !== operation.id);

                      await this.banksService.getBanks();
                      await this.groupInvestments();

                      await this.router.navigate(['/investments']);

                      this.toastController.create({
                        message: 'Investment closed successfully!',
                        duration: 2000,
                        position: 'top'
                      }).then(toast => toast.present());

                    }).catch((error: any) => {
                      console.error("Error updating broker balance:", error);
                    });
                }
                ).catch((error: any) => {
                  console.error("Error fetching broker details:", error);
                })
              }).catch((error: any) => {
                console.error("Error deleting investment:", error);
              });
            }).catch((error: any) => {
              console.error("Error deleting investment:", error);
            });
          }
        }
      ]
    }).then(alert => alert.present());

  }

  async groupInvestments() {
    this.groupInvestmentsByType();
    this.groupInvestmentsByAsset();
    await this.updateDailyPrices();

    this.investmentsGroupedByAsset.forEach((asset: any) => {
      const currentAssetPrice = asset.currentPrice;
      asset.operations.forEach((operation: any) => {
        this.banksService.banks.forEach((bank: any) => {
          if (bank.id == operation.broker.id) {
            bank.investedBalance = 0;
            bank.investedBalance += (operation.quantity * currentAssetPrice);
            bank.investedBalance = Math.round(bank.investedBalance * 100) / 100;
          }
        });
      });
    });

    await this.banksService.getBanks();

  }

  groupInvestmentsByType() {
    this.investmentsGroupedByTypeTEMP = [];
    for (let investment of this.investments) {
      let index = this.investmentsGroupedByTypeTEMP.findIndex((item: any) => item.type.name === investment.type.name);
      if (index === -1) {
        this.investmentsGroupedByTypeTEMP.push({
          type: investment.type,
          total: investment.currentPrice * investment.quantity,
          assets: [investment.ticker == undefined ? investment.first_currency + "/" + investment.second_currency : investment.ticker],
        });
      } else {
        if (typeof (this.investmentsGroupedByTypeTEMP[index].assets) != "object") {
          this.investmentsGroupedByTypeTEMP[index].assets = [];
        }
        this.investmentsGroupedByTypeTEMP[index].assets.push(investment.ticker == undefined ? investment.first_currency + "/" + investment.second_currency : investment.ticker);
      }
    }

    for (let i = 0; i < this.investmentsGroupedByTypeTEMP.length; i++) {
      this.investmentsGroupedByTypeTEMP[i].assets = [...new Set(this.investmentsGroupedByTypeTEMP[i].assets)];
    }

    for (let groupItem of this.investmentsGroupedByTypeTEMP) {
      if (groupItem.operations && Array.isArray(groupItem.operations)) {
        groupItem.operations.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      }
    }

    this.investmentsGroupedByTypeTEMP.sort((a: any, b: any) => {
      return b.total - a.total;
    });

  }

  groupInvestmentsByAsset() {
    this.investmentsGroupedByAssetTEMP = [];
    for (let investment of this.investments) {
      let assetIdentifier: string = "";
      if (investment.type.name === "Crypto") {
        assetIdentifier = investment.first_currency + "/" + investment.second_currency;
      } else {
        assetIdentifier = investment.ticker;
      }

      let index = this.investmentsGroupedByAssetTEMP.findIndex((item: any) =>
        item.ticker === assetIdentifier);

      if (index === -1) {
        this.investmentsGroupedByAssetTEMP.push({
          ticker: assetIdentifier,
          totalInitAmount: investment.init_amount,
          totalQuantity: investment.quantity,
          type: investment.type.name,
          operations: [investment]
        });
      } else {
        this.investmentsGroupedByAssetTEMP[index].totalInitAmount += investment.init_amount;
        this.investmentsGroupedByAssetTEMP[index].totalQuantity += investment.quantity;
        this.investmentsGroupedByAssetTEMP[index].type = investment.type.name;
        if (typeof (this.investmentsGroupedByAssetTEMP[index].operations) != "object") {
          this.investmentsGroupedByAssetTEMP[index].operations = [];
        }
        this.investmentsGroupedByAssetTEMP[index].operations.push(investment);
      }
    }

    this.investmentsGroupedByAssetTEMP.sort((a: any, b: any) => {
      return b.total - a.total;
    });
  }

  async updateDailyPrices() {
    for (let investment of this.investmentsGroupedByAssetTEMP) {
      if (investment.type == "Crypto") {
        const first_currency = investment.ticker.split("/")[0].toUpperCase();
        const second_currency = investment.ticker.split("/")[1].toUpperCase();

        const previousDataInLocalStorage = localStorage.getItem(first_currency + "/" + second_currency);
        if (previousDataInLocalStorage) {
          const previousData = JSON.parse(previousDataInLocalStorage);
          const lastUpdate = new Date(previousData.lastUpdate);
          if (lastUpdate.getTime() + 24 * 60 * 60 * 1000 > new Date().getTime()) {
            investment.currentPrice = previousData.price;
            this.chartsService.manageDataForInvestmentsChart(this.investmentsGroupedByAssetTEMP);
            continue;
          } else {
            investment.currentPrice = await this.updateCryptoPrice(first_currency, second_currency);
          }
        } else {
          investment.currentPrice = await this.updateCryptoPrice(first_currency, second_currency);
        }
      }
    }

    for (let investmentType of this.investmentsGroupedByTypeTEMP) {
      investmentType.total = 0;
      for (let investment of this.investmentsGroupedByAssetTEMP) {
        if (investmentType.type.name == investment.type) {
          investmentType.total += investment.currentPrice * investment.totalQuantity;
        }
      }
    }

    this.investmentsGroupedByAsset = this.investmentsGroupedByAssetTEMP;
    this.investmentsGroupedByType = this.investmentsGroupedByTypeTEMP;

  }

  async updateCryptoPrice(first_currency: string, second_currency: string) {
    let currentPrice = await this.apiService.getCryptoPrice(first_currency, second_currency)

    localStorage.setItem(first_currency + "/" + second_currency, JSON.stringify({ price: currentPrice, lastUpdate: new Date() }));
    this.chartsService.manageDataForInvestmentsChart(this.investmentsGroupedByAssetTEMP);

    return currentPrice;
  }

  updateInvestmentType(e: any) {
    if (e.target.value == "Crypto") {
      this.newInvestment = {
        ...this.newInvestment,
        first_currency: "btc",
        second_currency: "usd"
      }
    } else if (e.target.value == "Stock" || e.target.value == "ETF" || e.target.value == "Bond") {
      this.newInvestment = {
        ...this.newInvestment,
        ticker: ""
      }
    } else if (e.target.value == "Bond") {
      this.newInvestment = {
        ...this.newInvestment,
        ticker: ""
      }
    }
    else if (e.target.value == "Real Estate") {
      this.newInvestment = {
        ...this.newInvestment,
        ticker: ""
      }
    }
  }

  checkFields(): boolean {
    const type = this.newInvestment.type.name;
    if (type == "Crypto") {
      if (!this.newInvestment.first_currency || !this.newInvestment.second_currency) {
        return false;
      }
    } else if (type == "Stock" || type == "ETF" || type == "Bond") {
      if (!this.newInvestment.ticker) {
        return false;
      }
    } else if (type == "Real Estate") {
      if (!this.newInvestment.ticker) {
        return false;
      }
    }
    if (!this.newInvestment.broker) {
      return false;
    }
    if (!this.newInvestment.init_amount || this.newInvestment.init_amount <= 0) {
      return false;
    }
    return true;
  }

  private resetNewInvestment() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    this.newInvestment = {
      notes: "",
      init_amount: 5000,
      buyPrice: 1,
      quantity: 0.05,
      broker: "",
      type: "",
      date: `${year}-${month}-${day}`
    };
  }

}
