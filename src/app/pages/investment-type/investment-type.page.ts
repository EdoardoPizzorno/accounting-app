import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentsService } from 'src/app/services/investments.service';

@Component({
  selector: 'app-investment-type',
  templateUrl: './investment-type.page.html',
  styleUrls: ['./investment-type.page.scss'],
})
export class InvestmentTypePage implements OnInit {

  public investmentType: string = "";

  constructor(private activatedRoute: ActivatedRoute, public investmentsService: InvestmentsService, private router: Router) { }

  async ngOnInit() {
    if(this.activatedRoute.snapshot.params["name"]) {
      this.investmentType = this.activatedRoute.snapshot.params["name"];
      // await this.investmentsService.groupInvestments();
    }
    else
      this.router.navigate(["/investments"]);
  }

}
