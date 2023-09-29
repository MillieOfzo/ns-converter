import { Injectable, Injector } from '@angular/core';
import { CurrencyBaseService } from './currency-base.service';
import { FreeCurrencyService } from './endpoints/free-currency.service';
import { LiveCurrencyService } from './endpoints/live-currency.sevice';

export type FactoryType = 'free' | 'live'

@Injectable({
    providedIn: 'root'
})
export class CurrencyFactoryService {
    constructor(private injector: Injector) { }

    getService(type: FactoryType): CurrencyBaseService {
        switch (type) {
            case 'free':
                return this.injector.get(FreeCurrencyService);
            case 'live':
                return this.injector.get(LiveCurrencyService);
            default:
                throw new Error('Invalid service type');
        }
    }
}