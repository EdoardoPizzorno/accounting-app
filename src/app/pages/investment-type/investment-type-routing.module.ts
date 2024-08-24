import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentTypePage } from './investment-type.page';

const routes: Routes = [
  {
    path: '',
    component: InvestmentTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentTypePageRoutingModule {}
