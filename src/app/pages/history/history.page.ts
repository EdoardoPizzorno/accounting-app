import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { OperationsService } from 'src/app/services/operations.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  @ViewChild('chart', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(public operationsService: OperationsService, private chartsService: ChartService) { }

  async ngOnInit() {
    this.chartsService.historyChartCanvas = this.chartCanvas;
    
    await this.operationsService.getHistory();
    this.operationsService.groupByMonth();
    
    this.chartsService.createHistoryChart(this.operationsService.history);
  }

}
