import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestmentTypePageRoutingModule } from './investment-type-routing.module';

import { InvestmentTypePage } from './investment-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestmentTypePageRoutingModule
  ],
  declarations: [InvestmentTypePage]
})
export class InvestmentTypePageModule {}
