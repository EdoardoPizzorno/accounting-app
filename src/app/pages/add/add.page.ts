import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BanksService } from 'src/app/services/banks.service';
import { InvestmentsService } from 'src/app/services/investments.service';
import { OperationsService } from 'src/app/services/operations.service';
import { ReasonsService } from 'src/app/services/reason.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  constructor(public reasonsService: ReasonsService, public operationsService: OperationsService, private activatedRoute: ActivatedRoute, private router: Router, private investmentsService: InvestmentsService, public banksService: BanksService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["reason"])
        this.operationsService.operation.firstReason = params["reason"];
      if (params["ticker"])
        this.operationsService.operation.ticker = params["ticker"];
    });
  }

  checkIfInvestment() {
    if (this.operationsService.operation.firstReason == "investment") {
      this.investmentsService.newInvestment = {
        title: this.operationsService.operation.title,
        description: this.operationsService.operation.description,
        amount: this.operationsService.operation.amount
      }
      this.router.navigate(["/add/investment"]);
    }
  }

}
