import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyBaseService, CurrencyResponse } from '../currency-base.service';

@Injectable({
  providedIn: 'root'
})
export class LiveCurrencyService extends CurrencyBaseService {

  private apiUrl = 'https://api.currencyapi.com/v3/';

  API_KEY = 'fca_live_XJxrRIZFJIjnGYKXTsk48u7s5pXgjA494J3HrHL8';

  constructor(public http: HttpClient) {
    super();
  }

  getExchangeRate(from: string, to: string): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(`${this.apiUrl}latest?apikey=${this.API_KEY}&base_currency=${from}&currencies=${to}`);
  }
 
  getExchangeHistorical(from: string, to: string): Observable<CurrencyResponse> {
    return this.http.get<any>(`${this.apiUrl}historical?apikey=${this.API_KEY}&base_currency=${from}&currencies=${to}&date_from=2023-09-27T12%3A19%3A33.193Z&date_to=2023-09-27T12%3A19%3A33.193Z`);
  }
}