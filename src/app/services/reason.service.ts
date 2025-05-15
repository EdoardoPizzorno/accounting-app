import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ToastManager } from '../utilities/toast.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ReasonsService {

  public reasons: any = [];

  constructor(private dataService: DataService, private alertController: AlertController, private toastManager: ToastManager) { }

  async getReasons() {
    await this.dataService.get('reasons').then((response: any) => {
      this.reasons = response;
    }
    ).catch((error: any) => {
      console.error("Error fetching reasons:", error);
    });
  }

  async add() {
    await this.alertController.create({
      header: 'Add a reason',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Reason',
          value: ''
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
          handler: (data) => {
            this.dataService.post('reasons', { name: data.name, color: data.color }).then((response: any) => {
              this.toastManager.presentToast(`Reason ${data.name} added successfully`);
              this.reasons.push(response);
            }).catch((error: any) => {
              console.error("Error adding reason:", error);
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }

}
