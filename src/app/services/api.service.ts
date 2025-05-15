import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiAVService {

  URL: string = "https://www.alphavantage.co/query?";

  constructor(private dataService: DataService, private alertController: AlertController) {
    const API_KEY = dataService.profileData.API;
    if (!API_KEY) {
      this.alertController.create({
        header: 'Error',
        message: 'API key not found. Please set it in the profile settings.',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    }
    else {
      this.URL += "apikey=" + API_KEY;
    }
  }

  async getCryptoPrice(first_currency: string, second_currency: string) {
    return await new Promise((resolve, reject) => {
      fetch(this.URL + "&function=CURRENCY_EXCHANGE_RATE&from_currency=" + first_currency + "&to_currency=" + second_currency)
        .then(response => response.json())
        .then(data => {
          if (data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]) {
            resolve(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
          } else {
            reject("No data found for the given currencies.");
          }
        })
        .catch(error => {
          console.error("Error fetching crypto buyPrice:", error);
          reject(error);
        });
    })
  }

  async getStockPrice(ticker: string) {
    return new Promise((resolve, reject) => {
      fetch(this.URL + "GLOBAL_QUOTE&symbol=" + ticker)
        .then(response => response.json())
        .then(data => {
          if (data["Global Quote"]) {
            resolve(data["Global Quote"]);
          } else {
            reject("No data found for the given ticker.");
          }
        })
        .catch(error => {
          console.error("Error fetching stock buyPrice:", error);
          reject(error);
        });
    });
  }

}
