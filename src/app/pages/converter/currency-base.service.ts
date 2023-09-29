import { Observable } from 'rxjs';

export interface CurrencyResponse {
    data: {}
}

export abstract class CurrencyBaseService {
    abstract getExchangeRate(from: string, to: string): Observable<CurrencyResponse>;

    abstract getExchangeHistorical(from: string, to: string): Observable<CurrencyResponse>;
}