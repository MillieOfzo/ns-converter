import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LoadingProvider {
  isShowingLoader: boolean = false;

  loader: HTMLIonLoadingElement;

  public get controller() {
    return this.loadingCtrl;
  }

  constructor(private loadingCtrl: LoadingController) {}

  async showLoader() {
    if (!this.isShowingLoader) {
      const options = {
        spinner: null,
        message: '',
        cssClass: 'loader-css-class',
      };
      this.isShowingLoader = true;
      this.loader = await this.loadingCtrl.create(options);
      return this.loader.present();
    }
    return null;
  }

  async stopLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
      this.isShowingLoader = false;
    }
  }
}
