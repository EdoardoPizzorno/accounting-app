import { Component } from '@angular/core';
import { InvestmentsService } from 'src/app/services/investments.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private operationsService: OperationsService, private investmentsService: InvestmentsService) { }

  async ngOnInit() {
    await this.operationsService.getHistory();
    await this.investmentsService.getInvestments();
  }

}
