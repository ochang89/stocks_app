import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StocksService } from '../stocks.service';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from "chart.js";


export type stockData = Array<{
  date: string;
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
}>;

@Component({
  selector: 'app-get-stock-list',
  templateUrl: './get-stock-list.component.html',
  styleUrls: ['./get-stock-list.component.css']
})

export class GetStockListComponent {
  button = document.getElementById('button1');
  tiingo_API_TOKEN: string = 'be8c9784e7cd1f96be661df808c6be2b6eed78d6';
  request = require('request');
  ticker: string = '';
  date: string = '';
  showTicker!: string;
  jsonData: any;
  stocksMap = new Map<string, stockData>;
  mapVals!: stockData;
  displayMsg: string | undefined = '';
  closePrice: any;
  unformattedDate: string = '';
  showDate: string = '';
  volume: string = '';
  averageHighLow: any;
  stockDates: string[] = [];
  openPrices!: string[];
  openPrice: string = '';
  chart!: Chart;
  volumeArr: string[] = [];
  keys: string[] = [];

  constructor(private router: Router, private stocksService: StocksService) {
  }

  onSubmit() {
    //call api. can only manipulate data in subscription
    this.displayMsg = "Getting stock data..";
    this.stocksService.getStocksList(this.ticker, this.date, this.tiingo_API_TOKEN).subscribe(data => {
      console.log(data);
      this.jsonData = data;
      const openPrices = this.jsonData.map((obj: { open: any; }) => obj.open);
      //jsonData contains daily info for the whole week
      this.stocksMap.set(this.ticker.toUpperCase(), this.jsonData);
      this.mapVals = this.stocksMap.get(this.ticker.toUpperCase())!;
      console.log(this.stocksMap);
      this.closePrice = `$${this.jsonData[0].close}`;
      this.volume = `${this.jsonData[0].volume}`;
      this.averageHighLow = (((parseFloat(this.jsonData[0].high) + parseFloat(this.jsonData[0].low)) / 2).toFixed(2)).toString();
      this.unformattedDate = this.jsonData[0].date;
      console.log(`unformatted date: ` + this.unformattedDate);
      this.showDate = `${this.formatDate(this.unformattedDate)}`;
      this.displayMsg = this.displayMessage();
      this.getStockDates();
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.stockDates,
          datasets: [
            { 
              data: this.volumeArr,
              borderColor: "#3cba9f",
              backgroundColor: "#3cba9f",
              fill: true
            },
            { 
              data: this.averageHighLow,
              borderColor: "#ffcc00",
              fill: false
            },
          ]
        },
        options: {
          scales: {
            x: {
              display: true
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
    });
    this.showTicker = this.ticker.toUpperCase();
    
  }

  displayMessage = () => {
    console.log(`Formatted date: ` + this.showDate);
    const day = new Date(this.showDate);
    console.log(`day: ` + day);
    let dayOf = day.getDay();
    console.log(dayOf);
    return this.checkIfWeekend();
  }

  formatDate = (date: string): string => {
    const splitDate = date.split("T")[0];
    console.log(splitDate);
    console.log(`Date formatted: ${splitDate}`);
    return splitDate;
  }

  checkIfWeekend = (): string => {
    const inputDay = new Date(this.showDate).getDay();
    const stockInfo: stockData = this.mapVals;

    const inputDate = stockInfo[0].date;
    console.log(`inputDate: ${inputDate}`);
    // map creates new array and assigns each day.date to it
    // forEach doesn't return ANYTHING (void)
    const stockWeek = stockInfo.filter(day => day.date);
    console.log(`Stock week` + stockWeek);

    if (inputDay === 6 || inputDay === 0 || !inputDate.includes(this.showDate)) return `Stock market was not open on ${this.date}. The next open trading day is ${this.showDate}.`;

    return `Successfully retrieved data`;
  }

  getStockDates = () => {
    this.stocksMap.forEach((value: stockData) => {
      value.filter(dates => this.stockDates.push(this.formatDate(dates.date.slice(5, -1))));
      value.filter(vol => this.volumeArr.push(vol.volume));
      value.filter(key => this.keys = Object.getOwnPropertyNames(key));
      console.log(this.keys);
    });
  }

  // addChartData(chart, label, data) {
  //   chart.data.labels.push(label);
  //   chart.data.datasets.forEach((dataset) => {
  //       dataset.data.push(data);
  //   });
  //   chart.update();
// }
}
