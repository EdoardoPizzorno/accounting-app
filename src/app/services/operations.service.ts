import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BanksService } from './banks.service';
import { AlertController } from '@ionic/angular';
import { ToastManager } from '../utilities/toast.service';
import { formatDate, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { Router } from '@angular/router';
import { ChartService } from './chart.service';

registerLocaleData(localeIt);

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  public history: any = [];
  public operation: any = {};
  public groupedOperations: { label: string, operations: any[] }[] = [];

  constructor(private dataService: DataService, private banksService: BanksService, private chartService: ChartService,
    private alertController: AlertController, private toastManager: ToastManager, private router: Router) {
    this.resetOperation();
  }

  async getHistory() {
    await this.dataService.get("operations").then((response: any) => {
      this.history = response;
    }).catch((error: any) => {
      console.error("Error fetching operations:", error);
    });
  }


  groupByMonth() {
    const grouped = new Map<string, any[]>();

    for (const op of this.history) {
      const date = new Date(op.date);
      const key = formatDate(date, 'MMMM yyyy', 'it-IT').toUpperCase();

      if (!grouped.has(key)) {
        grouped.set(key, []);
      }

      grouped.get(key)!.push(op);
    }

    this.groupedOperations = Array.from(grouped.entries())
      .map(([label, operations]) => ({ label, operations }))
      .sort((a, b) => {
        // Ordina per data decrescente
        const [ma, ya] = a.label.split(' ');
        const [mb, yb] = b.label.split(' ');
        return new Date(`${yb}-${this.getMonthNumber(mb)}-01`).getTime() -
          new Date(`${ya}-${this.getMonthNumber(ma)}-01`).getTime();
      });
  }

  getMonthNumber(month: string): string {
    const months = [
      'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
      'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
    ];
    const index = months.indexOf(month.toLowerCase());
    return (index + 1).toString().padStart(2, '0');
  }

  add() {
    if (!this.operation.title || !this.operation.amount || !this.operation.bank) {
      this.alertController.create({
        header: 'Error',
        message: 'Please fill in all fields.',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    } else {
      this.dataService.post("operations", this.operation).then((response: any) => {
        let newOperation = response;
        this.dataService.get("banks", { id: this.operation.bank }).then((response: any) => {
          newOperation.bank = response[0];

          this.history.push(newOperation);

          this.banksService.runningMonth += parseFloat(this.operation.amount || 0);

          this.history.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });

          let newBankData = this.banksService.banks.filter((item: any) => {
            return item.id === this.operation.bank;
          });

          let newBalance: number = 0;
          if (newBankData && newBankData.length > 0) {
            newBalance = (parseFloat(newBankData[0].availableBalance || 0) + parseFloat(this.operation.amount || 0));
            newBalance = Math.round(newBalance * 100) / 100;
          } else {
            newBalance = parseFloat(this.operation.amount || 0);
          }

          this.dataService.update("banks", { id: this.operation.bank, balance: newBalance })
            .then(async (response: any) => {
              this.resetOperation();
              this.toastManager.presentToast("Operation added successfully", "success");
              this.router.navigate(["/history"]);

              await this.banksService.getBanks();
              this.groupByMonth();
              this.chartService.createHistoryChart(this.history);
            }).catch((error: any) => {
              console.error("Error updating bank balance:", error);
            });

        }
        ).catch((error: any) => {
          console.error("Error adding operation:", error);
        });
      });

    }
  }

  async edit(operation: any) {
    // DA FARE QUALCOSA 
  }

  async delete(operation: any) {
    this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this operation?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            // DELETE request to the server DA FARE
            this.history = this.history.filter((item: any) => item !== operation);
            this.dataService.delete("operations", { id: operation.id }).then((response: any) => {
              this.toastManager.presentToast("Operation deleted successfully", "success");
            }).catch((error: any) => {
              console.error("Error deleting operation:", error);
            });
            this.banksService.getBanks();
          }
        }
      ]
    }).then(alert => alert.present());
    return;
  }

  async updateRunningMonth() {
    this.banksService.runningMonth = 0;
    for (let i = this.history.length - 1; i >= 0; i--) {
      const operation = this.history[i];
      const date = new Date(operation.date);
      if (date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
        this.banksService.runningMonth += Math.round((operation.amount) * 100) / 100;
      }
    }
    console.log(this.banksService.runningMonth);
  }

  resetOperation() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    this.operation = {
      title: "",
      description: "",
      amount: "",
      bank: "",
      firstReason: "",
      secondReason: "",
      date: `${year}-${month}-${day}`
    };
  }

}
