import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { InvestmentsService } from '../../services/investments.service';
import { DataService } from 'src/app/services/data.service';
import { ChartService } from 'src/app/services/chart.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.page.html',
  styleUrls: ['./investments.page.scss'],
})
export class InvestmentsPage implements OnInit {

  @ViewChild('chart', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;

  constructor(public investmentsService: InvestmentsService, private dataService: DataService, private chartsService: ChartService, private operationsService: OperationsService) { }

  async ngOnInit() {
    this.chartsService.investmentsChartCanvas = this.chartCanvas;
    
    await this.investmentsService.getInvestments();
    await this.investmentsService.getInvestmentTypes();
    await this.investmentsService.groupInvestments();
    
    this.chartsService.createInvestmentsChart();
  }

}
