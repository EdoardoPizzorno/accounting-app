import { Injectable } from '@angular/core';
import _axios from 'axios';
// import this.data from './sample';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public accountingData: any = {};
  public profileData: any = {};
  public historyChartData: any = {};

  constructor() {
    this.initializeAccountingLocalData();
    this.initializeProfileLocalData();
    this.initializeHistoryChartData();
  }

  public get(resource: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let response: any = {};

      if (!(resource in this.accountingData)) {
        reject(new Error('Resource not found'));
        return;
      }

      if (params) {
        response = this.accountingData[resource as keyof typeof this.accountingData].filter((item: any) => {
          return Object.keys(params).every(key => item[key] === params[key]);
        });
      } else {
        response = this.accountingData[resource];
      }

      if (response) {
        resolve(response);
      }
      else {
        reject(new Error('Resource not found'));
      }
    });
  }

  public post(resource: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (params) {
        const newDataToAdd = {
          id: this.accountingData[resource as keyof typeof this.accountingData].length + 1,
          ...params
        };
        this.accountingData[resource as keyof typeof this.accountingData].push(newDataToAdd);
        localStorage.setItem("ACC-LOCAL-DATA", JSON.stringify(this.accountingData));
        resolve(newDataToAdd);
      } else {
        reject(new Error('No parameters provided'));
      }
    });
  }

  public update(resource: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!(resource in this.accountingData)) {
        reject(new Error('Resource not found'));
        return;
      }

      if (params) {
        const index = parseInt(this.accountingData[resource as keyof typeof this.accountingData].findIndex((item: any) => item.id === params.id));
        if (index !== -1) {
          this.accountingData[resource as keyof typeof this.accountingData][index] = { ...this.accountingData[resource as keyof typeof this.accountingData][index], ...params };
          localStorage.setItem("ACC-LOCAL-DATA", JSON.stringify(this.accountingData));
          resolve(this.accountingData[resource as keyof typeof this.accountingData][index]);
        } else {
          reject(new Error('Resource not found'));
        }
      }
      else {
        reject(new Error('No parameters provided'));
      }
    });
  }

  public delete(resource: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!(resource in this.accountingData)) {
        reject(new Error('Resource not found'));
        return;
      }

      if (params) {
        const index = parseInt(this.accountingData[resource as keyof typeof this.accountingData].findIndex((item: any) => item.id == params.id));
        if (index !== -1) {
          this.accountingData[resource as keyof typeof this.accountingData].splice(index, 1);
          localStorage.setItem("ACC-LOCAL-DATA", JSON.stringify(this.accountingData));
          resolve(this.accountingData[resource as keyof typeof this.accountingData]);
        } else {
          reject(new Error('Resource not found'));
        }
      } else {
        reject(new Error('No parameters provided'));
      }
    });
  }

  public error(error: any) {
    console.error('Error:', error);
    return Promise.reject(error);
  }

  private initializeAccountingLocalData() {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const defaultInvestment = {
      "id": 1,
      first_currency: "BTC",
      second_currency: "USD",
      notes: "",
      init_amount: 5000,
      buyPrice: 100,
      quantity: 0.05,
      broker: {
        "id": 1,
        "name": "BBVA",
        "color": "",
        "availableBalance": 10000
      },
      type: {
        "id": 4,
        "name": "Crypto",
        "color": "purple"
      },
      date: `${year}-${month}-${day}`
    }

    const defaultOperation = {
      "id": 1,
      "title": "Acconto",
      "description": "",
      "amount": 10000,
      "bank": {
        "id": 1,
        "name": "BBVA",
        "color": "",
        "availableBalance": 0
      },
      "firstReason": "",
      "secondReason": "",
      "date": `${year}-${month}-${day}`
    }

    const defaultBank = {
      id: 1,
      name: "BBVA",
      availableBalance: 10000,
      type: "bank",
      investedBalance: 0
    }

    let storageContent = localStorage.getItem("ACC-LOCAL-DATA");
    if (!storageContent) {
      localStorage.setItem("ACC-LOCAL-DATA", JSON.stringify({
        "banks": [
          defaultBank
        ],
        "investments": [

        ],
        "closedInvestments": [
        ],
        "operations": [
          defaultOperation
        ],
        "reasons": [
          {
            "id": 1,
            "name": "Svago",
            "color": "yellow"
          },
          {
            "id": 2,
            "name": "Viaggi",
            "color": "blue"
          },
          {
            "id": 3,
            "name": "Cibo",
            "color": "green"
          },
          {
            "id": 4,
            "name": "Salute",
            "color": "lightgreen"
          },
          {
            "id": 5,
            "name": "Palestra",
            "color": "orange"
          },
          {
            "id": 6,
            "name": "Abbigliamento",
            "color": "lightyellow"
          },
          {
            "id": 7,
            "name": "Trasporti",
            "color": "blueturquoise"
          },
          {
            "id": 8,
            "name": "Serate",
            "color": "yellowgreen"
          },
          {
            "id": 9,
            "name": "Cervello",
            "color": "lightblue"
          },
          {
            "id": 10,
            "name": "Parrucchiere",
            "color": "lightpink"
          },
          {
            "id": 11,
            "name": "Regali",
            "color": "lightpink"
          },
          {
            "id": 12,
            "name": "Tecnologia",
            "color": "blueviolet"
          },
          {
            "id": 13,
            "name": "Casa",
            "color": "lightgray"
          },
          {
            "id": 14,
            "name": "Investimenti",
            "color": "purple"
          },
          {
            "id": 15,
            "name": "Imprevisti",
            "color": "red"
          },
          {
            "id": 16,
            "name": "Macchina",
            "color": "lightcoral"
          },
          {
            "id": 17,
            "name": "Non necessario",
            "color": "lightred"
          },
          {
            "id": 18,
            "name": "Furto",
            "color": "redwine"
          },
          {
            "id": 19,
            "name": "Altro",
            "color": "lightgray"
          }
        ],
        "investmentTypes": [
          {
            "id": 1,
            "name": "Stock",
            "color": "blue"
          },
          {
            "id": 2,
            "name": "ETF",
            "color": "green"
          },
          {
            "id": 3,
            "name": "Bond",
            "color": "yellow"
          },
          {
            "id": 4,
            "name": "Crypto",
            "color": "purple"
          },
          {
            "id": 5,
            "name": "Real Estate",
            "color": "red"
          }
        ]
      }));
    } else {
      this.accountingData = JSON.parse(storageContent);
    }
  }

  private initializeProfileLocalData() {
    let storageContent = localStorage.getItem("ACC-LOCAL-PROFILE-DATA");
    if (!storageContent) {
      localStorage.setItem("ACC-LOCAL-PROFILE-DATA", JSON.stringify({
        "name": "John",
        "surname": "Doe",
        "email": "gmail@gmail.com",
        "phone": "+1234567890",
        "dateOfBirth": "1990-01-01",
        "profilePicture": "https://www.creaavatar.it/wp-content/uploads/2021/01/myAvatar-13.png",
        "preferences": {
          "currency": "USD",
          "language": "en",
          "theme": "light"
        },
        "settings": {
          "notifications": true,
          "privacy": "public",
          "location": true
        },
        "socialMedia": {
          "facebook": "https://www.facebook.com/johndoe",
          "twitter": "https://twitter.com/johndoe",
          "instagram": "https://www.instagram.com/johndoe",
          "linkedin": "https://www.linkedin.com/in/johndoe"
        },
        "API": ""
      }));
    }
    else {
      this.profileData = JSON.parse(storageContent);
    }
  }

  private initializeHistoryChartData() {
    let storageContent = localStorage.getItem("ACC-LOCAL-CHART-DATA");
    if (!storageContent) {
      localStorage.setItem("ACC-LOCAL-CHART-DATA", JSON.stringify({
        "general": {
          "labels": [],
          "data": []
        },
        "investments": {
          "labels": [],
          "data": []
        },
      }));
    } else {
      this.historyChartData = JSON.parse(storageContent);
    }
  }
}
