import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyBaseService, FactoryCurrencyListResponse, FactoryResponse } from '../currency-base.service';

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

    public countryCodes: FactoryCurrencyListResponse = {
        'EUR': 'Euro',
        'USD': 'US Dollar',
        'JPY': 'Japanese Yen',
        'BGN': 'Bulgarian Lev',
        'CZK': 'Czech Republic Koruna',
        'DKK': 'Danish Krone',
        'GBP': 'British Pound Sterling',
        'HUF': 'Hungarian Forint',
        'PLN': 'Polish Zloty',
        'RON': 'Romanian Leu',
        'SEK': 'Swedish Krona',
        'CHF': 'Swiss Franc',
        'ISK': 'Icelandic Króna',
        'NOK': 'Norwegian Krone',
        'HRK': 'Croatian Kuna',
        'RUB': 'Russian Ruble',
        'TRY': 'Turkish Lira',
        'AUD': 'Australian Dollar',
        'BRL': 'Brazilian Real',
        'CAD': 'Canadian Dollar',
        'CNY': 'Chinese Yuan',
        'HKD': 'Hong Kong Dollar',
        'IDR': 'Indonesian Rupiah',
        'ILS': 'Israeli New Sheqel',
        'INR': 'Indian Rupee',
        'KRW': 'South Korean Won',
        'MXN': 'Mexican Peso',
        'MYR': 'Malaysian Ringgit',
        'NZD': 'New Zealand Dollar',
        'PHP': 'Philippine Peso',
        'SGD': 'Singapore Dollar',
        'THB': 'Thai Baht',
        'ZAR': 'South African Rand',
    }

    getExchangeRate(from: string, to: string): Observable<FactoryResponse> {
        return this.http.get<FreeFactoryResponse>(`${this.apiUrl}latest?apikey=${this.API_KEY}&base_currency=${from}&currencies=${to}`);
    }

    getExchangeHistorical(from: string, to: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}historical?apikey=${this.API_KEY}&base_currency=${from}&currencies=${to}&date_from=2023-09-27T12%3A19%3A33.193Z&date_to=2023-09-27T12%3A19%3A33.193Z`);
    }
}