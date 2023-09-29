import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ThemeProvider {


  private _sideMenuBackgroundImg: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );


  constructor(
  ) { }

  getSideMenuBackground() {
    return this._sideMenuBackgroundImg.asObservable();
  }

  setSideMenuBackground(val: string) {
    this._sideMenuBackgroundImg.next(val);
  }

}
