import { ElementRef, Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { OperationsService } from './operations.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public historyChartCanvas!: ElementRef<HTMLCanvasElement>;
  public historyChart!: Chart;

  public investmentsChartCanvas!: ElementRef<HTMLCanvasElement>;
  public investmentsChart!: Chart;

  constructor(private dataService: DataService) { }

  createHistoryChart(history: any) {
    if (this.historyChart) {
      this.historyChart.destroy();
    }
    Chart.defaults.font.family = 'Poppins';
    Chart.register(...registerables);

    const expensesByReason = new Map<string, { total: number, color: string }>();

    history.forEach((item: any) => {
      if (item.amount < 0) {
        const reasonName = item.firstReason.name;
        const amount = Math.abs(item.amount);

        if (!expensesByReason.has(reasonName)) {
          expensesByReason.set(reasonName, {
            total: amount,
            color: item.firstReason.color
          });
        } else {
          const current = expensesByReason.get(reasonName)!;
          expensesByReason.set(reasonName, {
            total: current.total + amount,
            color: current.color
          });
        }
      }
    });

    this.historyChart = new Chart(this.historyChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: Array.from(expensesByReason.keys()),
        datasets: [
          {
            data: Array.from(expensesByReason.values()).map(v => v.total),
            backgroundColor: Array.from(expensesByReason.values()).map(v => v.color),
            borderWidth: 1,
            borderColor: '#000000',
            hoverOffset: 8,
            hoverBorderWidth: 3,
            borderRadius: 5,
          }
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            titleFont: {
              weight: 'bold'
            }
          }
        },
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        elements: {
          arc: {
            borderWidth: 2,
            borderColor: '#ffffff',
          }
        },
        cutout: '0%',
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          easing: 'easeOutQuart'
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        }
      }
    });
  }

  createInvestmentsChart() {
    Chart.defaults.font.family = 'Poppins';
    Chart.register(...registerables);
    Chart.defaults.elements.bar.borderWidth = 2;

    this.investmentsChart = new Chart(this.investmentsChartCanvas.nativeElement, {
      type: 'line', // bar, line, pie, doughnut, radar, polarArea, bubble, scatter
      data: {
        labels: this.dataService.historyChartData.investments.labels,
        datasets: [
          {
            data: this.dataService.historyChartData.investments.data,
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

  manageDataForInvestmentsChart(investments: any) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();


    let totalAmountInvested:number = 0;

    investments.forEach((investmentType: any) => {
      totalAmountInvested += (investmentType.totalQuantity * investmentType.currentPrice);
    });

    if (this.dataService.historyChartData.investments.labels.length > 0) {
      const lastLabel = this.dataService.historyChartData.investments.labels[this.dataService.historyChartData.investments.labels.length - 1];
      const lastLabelDate = lastLabel.split('/');
      const lastLabelMonth = parseInt(lastLabelDate[1]);
      const lastLabelYear = parseInt(lastLabelDate[2]);
      
      if(lastLabelMonth === (currentMonth + 1) && lastLabelYear === currentYear) {
        this.dataService.historyChartData.investments.data[this.dataService.historyChartData.investments.data.length - 1] = totalAmountInvested;
      } else {
        this.dataService.historyChartData.investments.labels.push(`${currentDay}/${currentMonth + 1}/${currentYear}`);
        this.dataService.historyChartData.investments.data.push(totalAmountInvested);
      }
    }
    else {
      this.dataService.historyChartData.investments.labels.push(`${currentDay}/${currentMonth + 1}/${currentYear}`);
      this.dataService.historyChartData.investments.data.push(0);
    }

    localStorage.setItem("ACC-LOCAL-HISTORY-CHART-DATA", JSON.stringify(this.dataService.historyChartData));
  }

}
