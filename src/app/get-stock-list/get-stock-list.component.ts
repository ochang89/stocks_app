import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StocksService } from '../stocks.service';

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
  openPrice: any;
  closePrice: any;
  unformattedDate: string = '';
  showDate: string = '';
  // date = this.jsonData[0].date;

  constructor(private router: Router, private stocksService: StocksService) {

  }

  onSubmit() {
    //call api. can only manipulate data in subscription
    this.displayMsg = "Getting stock data..";
    this.stocksService.getStocksList(this.ticker, this.date).subscribe(data => {
      console.log(data);
      this.jsonData = data;
      this.closePrice = `$${this.jsonData[0].close}`;
      this.openPrice = `$${this.jsonData[0].open}`;
      this.unformattedDate = this.jsonData[0].date;
      console.log(`unformatted date: ` + this.unformattedDate);
      this.showDate = `${this.formatDate(this.unformattedDate)}`;
      this.displayMsg = this.displayMessage();
    });
    this.showTicker = this.ticker.toUpperCase();
  }

  displayMessage() {
    console.log(`Formatted date: ` + this.showDate);
    const day = new Date(this.showDate);
    console.log(`day: ` + day);
    let dayOf = day.getDay();
    console.log(dayOf);
    console.log(this.checkIfWeekend());
    return this.checkIfWeekend();
  }

  formatDate(date: string){
    const splitDate = date.split("T")[0];
    console.log(splitDate);
    // convert to number to subtract 1 day, then re-convert to string
    // let day = (parseInt(splitDate[2])-1).toString();
    // replace updated day in date
    // splitDate[2] = day;
    // const finalDate = splitDate.join("-");
    console.log(`Date formatted: ${splitDate}`);
    return splitDate;
  }

  checkIfWeekend(){
    const inputDate = new Date(this.date);
    const day = inputDate.getDay();

    if(day === 6 || day === 0){
      return `Stock market is not open on the weekends. The next open is ${this.showDate}`;
    }
    return `Successfully retrieved data`;
  }
}
