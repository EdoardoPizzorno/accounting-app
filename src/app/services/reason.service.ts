import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReasonsService {

  constructor() { }

  public alertButtons: any = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Confirm',
      handler: (e: any) => {
        this.addReason(e[0])
      }
    }
  ];

  public newReason: any = [
    {
      placeholder: 'Name',
      name: '',
      color: ''
    }
  ];

  addReason(reason: string) {
    console.log(reason);
  }
}
