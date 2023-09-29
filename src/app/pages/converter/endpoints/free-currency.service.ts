import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyBaseService, FactoryResponse } from '../currency-base.service';

export type FreeFactoryResponse = {
    data: {
        [key: string]: number
    }
};

@Injectable({
    providedIn: 'root'
})
export class FreeCurrencyService extends CurrencyBaseService {

    private apiUrl = 'https://api.freecurrencyapi.com/v1/';

    API_KEY = 'fca_live_YF6Bj1C4q9O1TwsdwhBX0M97MbhnObYIVqK6lC14';

    constructor(public http: HttpClient) {
        super();
    }

    getExchangeRate(from: string, to: string): Observable<FactoryResponse> {
        return this.http.get<FreeFactoryResponse>(`${this.apiUrl}latest?apikey=${this.API_KEY}&base_currency=${from}&currencies=${to}`);
    }

    getExchangeHistorical(from: string, to: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}historical?apikey=${this.API_KEY}&base_currency=${from}&currencies=${to}&date_from=2023-09-27T12%3A19%3A33.193Z&date_to=2023-09-27T12%3A19%3A33.193Z`);
    }
}