import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestmentsPageRoutingModule } from './investments-routing.module';

import { InvestmentsPage } from './investments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestmentsPageRoutingModule
  ],
  declarations: [InvestmentsPage]
})
export class InvestmentsPageModule {}
