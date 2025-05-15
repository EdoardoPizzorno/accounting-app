import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ToastManager } from '../utilities/toast.service';
import { AlertController } from '@ionic/angular';
import { InvestmentsService } from './investments.service';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  public newBank: any = {};

  public banks: any = [];

  public totalBalance: number = 0;

  constructor(private dataService: DataService, private alertController: AlertController, private toastManager: ToastManager) { }

  async getBanks() {
    this.banks = await this.dataService.get('banks');

    await this.updateTotalBalance();
  }

  getTotalBalance() {
    this.totalBalance = 0;
    this.banks.forEach((bank: any) => {
      this.totalBalance += Math.round((bank.availableBalance + bank.investedBalance) * 100) / 100;
    });
    return this.totalBalance;
  }

  async updateTotalBalance() {
    this.totalBalance = 0;
    this.banks.forEach((bank: any) => {
      this.totalBalance += Math.round((bank.availableBalance + bank.investedBalance) * 100) / 100;
    });
  }

  async add() {
    const alert = await this.alertController.create({
      header: 'Add a bank',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Bank name',
        },
        {
          name: 'color',
          type: 'text',
          placeholder: 'Pick a color',
          attributes: {
            type: 'color'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (bank) => {
            this.dataService.post('banks', { name: bank.name, color: bank.color, balance: 0 }).then((response: any) => {
              this.toastManager.presentToast(`Bank ${bank.name} added successfully`);
              this.banks.push(response);
            }).catch(this.dataService.error);
          }
        }
      ]
    });

    await alert.present();

  }

  removeBank(bankId: any) {
    this.banks = this.banks.filter((item: any) => item.id !== bankId);
    this.dataService.delete('banks', { id: bankId }).then((response: any) => {
    }).catch(this.dataService.error);
  }
}
