import { formatDate } from '@angular/common';
import { Component, Inject, Injector, LOCALE_ID, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services';
import { identicon } from 'src/app/shared/utils/identicon';
import { CurrencyBaseService, FactoryCurrencyListResponse } from './currency-base.service';
import {
  CurrencyFactoryService,
  FactoryType,
} from './currency-factory.service';
import { CURRENCY_LIST } from './currency-list';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})
export class ConverterPage implements OnInit {
  private currencyService: CurrencyBaseService;

  factoryType: FactoryType = 'free';

  currentTime: string = '';

  profileAvatarSvg: SafeHtml = '';

  chartOptions = {
    animationEnabled: true,
    theme: 'light2',
    axisX: {
      valueFormatString: 'DD MMM',
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      crosshair: {
        enabled: true,
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      verticalAlign: 'bottom',
      horizontalAlign: 'right',
      dockInsidePlotArea: true,
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: 'line',
        showInLegend: true,
        name: 'Value',
        lineDashType: 'dash',
        markerType: 'square',
        xValueFormatString: 'DD MMM, YYYY',
        dataPoints: [],
      },
    ],
  };

  countryCodes: FactoryCurrencyListResponse = {};

  resultRate: number;
  swappedRate: number;

  fromValue: number;
  toValue: number;

  fromCurr: string = 'USD';
  toCurr: string = 'EUR';

  chart: any;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private injector: Injector,
    private serviceFactory: CurrencyFactoryService,
    private authService: AuthenticationService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.currentTime = formatDate(new Date(), 'dd/MM/yyyy H:m', this.locale);
    this.profileAvatarSvg = this.sanitizer.bypassSecurityTrustHtml(
      identicon('ns-converter')
    );

    this.changeEndpoint()
  }

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  updateChartWithData(newData: any[]): void {
    this.chart.options.data[0].dataPoints = newData;
    this.chart.render();
  }

  async getHistorical() {
    let from = this.fromCurr;
    let to = this.toCurr;

    try {
      const history = await firstValueFrom(
        this.currencyService.getExchangeHistorical(from, to)
      );
      const mappedData = this.mapForexData(history.data);
      this.updateChartWithData(mappedData);
    } catch (err) {
      console.error(err);
    }
  }

  async getCurrencyRate() {
    let from = this.fromCurr;
    let to = this.toCurr;
    try {
      const exchangeRate = await firstValueFrom(
        this.currencyService.getExchangeRate(from, to)
      );

      let rate = exchangeRate.data[to];

      this.resultRate = rate;

      // Update calculations
      this.calculateCurrencyOne();
      this.calculateCurrencyTwo();
    } catch (err) {
      console.error(err);
    }
  }

  calculateCurrencyOne() {
    this.toValue = this.fromValue * this.resultRate;
  }

  calculateCurrencyTwo() {
    this.fromValue = this.toValue / this.resultRate;
  }

  swapCurrency() {
    // Swap currencies
    [this.fromCurr, this.toCurr] = [this.toCurr, this.fromCurr];

    // Swap amounts
    [this.fromValue, this.toValue] = [this.toValue, this.fromValue];

    // Fetch new exchange rate
    this.getCurrencyRate();

    // Update calculations
    this.calculateCurrencyOne();
    this.calculateCurrencyTwo();
  }

  changeEndpoint() {
    // Get the current service dynamically
    this.currencyService = this.serviceFactory.getService(this.factoryType);

    this.countryCodes = this.currencyService.countryCodes;
    this.getCurrencyRate();
    this.getHistorical();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  private mapForexData(data: any): any[] {
    return Object.keys(data).map((key) => {
      const dateParts = key.split('-');
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript Date
      const day = parseInt(dateParts[2], 10);
      const value = data[key][this.toCurr];
      return { x: new Date(year, month, day), y: value };
    });
  }
}
