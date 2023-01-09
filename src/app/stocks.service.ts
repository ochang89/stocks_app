import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  url?: string;

  constructor(private http: HttpClient) { }

  getStocksList(ticker: string, date: string, API_TOKEN: string) {
    return this.http.get(`https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${date}&token=${API_TOKEN}`);
  }
}
