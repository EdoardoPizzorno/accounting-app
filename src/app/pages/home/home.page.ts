import { Component } from '@angular/core';
import { BanksService } from 'src/app/services/banks.service';
import { DataService } from 'src/app/services/data.service';
import { InvestmentsService } from 'src/app/services/investments.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private operationsService: OperationsService, private investmentsService: InvestmentsService, public banksService: BanksService, public dataService: DataService) { }

  async ngOnInit() {
    await this.banksService.getBanks();
    await this.operationsService.getHistory();
    await this.investmentsService.getInvestments();
    await this.investmentsService.groupInvestments();
  }

}
