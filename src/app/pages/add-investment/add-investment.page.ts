import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BanksService } from 'src/app/services/banks.service';
import { InvestmentsService } from 'src/app/services/investments.service';

@Component({
  selector: 'app-add-investment',
  templateUrl: './add-investment.page.html',
  styleUrls: ['./add-investment.page.scss'],
})
export class AddInvestmentPage implements OnInit {

  constructor(public investmentsService: InvestmentsService, private activatedRoute: ActivatedRoute, public banksService: BanksService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["type"])
        this.investmentsService.newInvestment.type = params["type"].toLowerCase();
    });
  }

}
