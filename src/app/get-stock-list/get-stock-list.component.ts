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
  API_TOKEN: string = 'be8c9784e7cd1f96be661df808c6be2b6eed78d6';
  request = require('request');
  ticker: string = '';
  date: string = '';
  // url: string = `https://api.tiingo.com/tiingo/daily/${this.ticker}/prices?startDate=${this.date}&token=${this.API_TOKEN}`;
  jsonData: any;
  displayMsg = '';
  openPrice: any;
  closePrice: any;
  // date = this.jsonData[0].date;

  constructor(private router: Router, private stocksService: StocksService) {

  }

  onSubmit() {
    //call api. can only manipulate data in subscription
    this.displayMsg = "Getting stock data..";
    this.stocksService.getStocksList(this.ticker, this.date).subscribe(data => {
      console.log(data);
      this.jsonData = data;
      this.closePrice = this.jsonData[0].close;
      this.openPrice = this.jsonData[0].open;
    });
  }
}
