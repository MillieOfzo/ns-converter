import { Observable } from 'rxjs';

export type FactoryCurrencyListResponse = {
    [key: string]: string
};

export type FactoryResponse = {
    data: {
        [key: string]: number
    }
};;

export abstract class CurrencyBaseService {
    public countryCodes: FactoryCurrencyListResponse = {};

    abstract getExchangeRate(from: string, to: string): Observable<FactoryResponse>;

    abstract getExchangeHistorical(from: string, to: string): Observable<any>;
}