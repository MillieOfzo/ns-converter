import { Observable } from 'rxjs';
import { LiveFactoryResponse } from './endpoints/live-currency.sevice';
import { FreeFactoryResponse } from './endpoints/free-currency.service';

export type FactoryResponse = {
    data: {
      [key: string]: number
    }
  };;

export abstract class CurrencyBaseService {
    abstract getExchangeRate(from: string, to: string): Observable<FactoryResponse>;

    abstract getExchangeHistorical(from: string, to: string): Observable<any>;
}