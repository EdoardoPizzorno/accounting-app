import { Component } from '@angular/core';
import { BanksService as BanksService } from 'src/app/services/banks.service';
import { InvestmentsService } from 'src/app/services/investments.service';
import { OperationsService } from 'src/app/services/operations.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private operationsService: OperationsService, private investmentsService: InvestmentsService, public profileService: ProfileService, public banksService: BanksService) { }

  async ngOnInit() {
    await this.operationsService.getHistory();
    await this.investmentsService.getInvestments();
  }

}
