import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastManager {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, output: string = "success") {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "top",
      cssClass: output + '-toast'
    });
    toast.present();
  }
}
