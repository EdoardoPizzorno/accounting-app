import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  title: string = "";
  description: string = "";
  amount: number = 0.0;
  bank: string = "";
  firstReason: string = "";
  secondReason: string = "";
  date: string = "";

  constructor() { }

  ngOnInit() {
    this.date = new Date().toISOString();
  }

  add() {
    
  }

}
