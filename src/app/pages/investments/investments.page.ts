import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { InvestmentsService } from '../../services/investments.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.page.html',
  styleUrls: ['./investments.page.scss'],
})
export class InvestmentsPage implements OnInit {

  @ViewChild('chart', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;

  private labels: any[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  private data: any[] = [100, 200, 150, 300, 250, 400];

  constructor(public investmentsService: InvestmentsService) { }

  async ngOnInit() {
    await this.investmentsService.getInvestments();
    this.createChart();
  }

  private createChart() {
    Chart.register(...registerables);
    Chart.defaults.elements.bar.borderWidth = 2;

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line', // bar, line, pie, doughnut, radar, polarArea, bubble, scatter
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            borderColor: 'rgb(66, 217, 107)',
            pointStyle: false,
            tension: 0.3,
            borderWidth: 5,
          }
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        }
      },
    });
  }

}
