import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StocksService } from '../stocks.service';

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
  displayMsg: string | undefined = '';
  closePrice: any;
  unformattedDate: string = '';
  showDate: string = '';
  volume: string = '';
  averageHighLow!: number;
  stocksMap = new Map<string, stockData>;
  mapVals = this.stocksMap.get(this.ticker);
  openPrices!: string[];
  openPrice!: string;

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
      console.log(this.stocksMap);
      this.closePrice = `$${this.jsonData[0].close}`;
      // this.openPrice = `$${this.jsonData[0].open}`;
      this.volume = `${this.jsonData[0].volume}`;
      this.averageHighLow = parseFloat(((parseFloat(this.jsonData[0].high) + parseFloat(this.jsonData[0].low))/2).toFixed(2));
      this.unformattedDate = this.jsonData[0].date;
      console.log(`unformatted date: ` + this.unformattedDate);
      this.showDate = `${this.formatDate(this.unformattedDate)}`;
      this.displayMsg = this.displayMessage();
    });
    this.showTicker = this.ticker.toUpperCase();
  }

  displayMessage = () => {
    console.log(`Formatted date: ` + this.showDate);
    const day = new Date(this.showDate);
    console.log(`day: ` + day);
    let dayOf = day.getDay();
    console.log(dayOf);
    console.log(this.checkIfWeekend());
    return this.checkIfWeekend();
  }

  formatDate = (date: string): string => {
    const splitDate = date.split("T")[0];
    console.log(splitDate);
    console.log(`Date formatted: ${splitDate}`);
    return splitDate;
  }

  checkIfWeekend = (): string => {
    const inputDay = new Date(this.date).getDay();

    if(inputDay === 6 || inputDay === 0) return `Stock market was not open on ${this.date}. The next open trading day is ${this.showDate}.`;
    
    return `Successfully retrieved data`;
  }
}
