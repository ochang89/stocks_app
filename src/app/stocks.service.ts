import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  ticker: string = '';
  date: string = '';
  API_TOKEN: string = 'be8c9784e7cd1f96be661df808c6be2b6eed78d6';
  url?: string;

  constructor(private http: HttpClient) { }

  getStocksList(ticker: string, date: string) {
    this.ticker = ticker;
    this.date = date;
    return this.http.get(`https://api.tiingo.com/tiingo/daily/${this.ticker}/prices?startDate=${this.date}&token=${this.API_TOKEN}`);
  }
}
