import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, map } from 'rxjs';
import { CurrencyBaseService, FactoryResponse } from '../currency-base.service';

export type LiveFactoryResponse = {
  data: {
    [key: string]: { code: string; value: number };
  }
};

@Injectable({
  providedIn: 'root'
})
export class LiveCurrencyService extends CurrencyBaseService {

  private apiUrl = 'https://api.currencyapi.com/v3/';

  API_KEY = 'fca_live_XJxrRIZFJIjnGYKXTsk48u7s5pXgjA494J3HrHL8';

  constructor(public http: HttpClient) {
    super();
  }

  getExchangeRate(from: string, to: string): Observable<FactoryResponse> {
    return this.http.get<LiveFactoryResponse>(`${this.apiUrl}latest?apikey=${this.API_KEY}&base_currency=${from}&currencies=${to}`).pipe(
      map(x => {
        const res: FactoryResponse = {
          data: {
          }
        }

        res.data[to] = x.data[to].value

        return res;
      })
    );
  }

  getExchangeHistorical(from: string, to: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}historical?apikey=${this.API_KEY}&base_currency=${from}&currencies=${to}&date=2023-09-27T12%3A19%3A33.193Z`);
  }
}