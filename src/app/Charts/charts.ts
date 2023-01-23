import { Chart, ChartConfiguration, ChartOptions, ChartType } from "chart.js";

export const volumeChart = (ctx: HTMLCanvasElement, stockDates: any, volumeArr: any, averageHighLow: any): Chart => {
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: stockDates,
          datasets: [
            { 
              data: volumeArr,
              borderColor: "rgba(0,153,0,1)",
              backgroundColor: "rgba(0,153,0,0.3)",
              fill: true,
            },
            { 
              data: averageHighLow,
              fill: false,
              borderColor: "rgba(0,0,0,0)"
            },
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              display: true,
              grid: {
                color: "gray"
              }
            },
            y: {
              title: {
                display: true,
                text: 'Volume'
              }
            }
          }
        }
      });
      return chart;
}