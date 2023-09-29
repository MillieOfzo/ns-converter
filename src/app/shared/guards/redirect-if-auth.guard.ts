import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
// import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class RedirectIfAuthGuard implements CanActivate {
  constructor(
    // private authService: AuthenticationService,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  canActivate() {
    return false
    // return this.authService.retrieveCurrentUser().then((user) => {
    //   if (user) {
    //     const { currentUser } = this.authService;
    //     this.menuCtrl.enable(true);
    //     this.authService.determineRedirect(currentUser).then((redirectObj) => {
    //       this.router.navigate(redirectObj.route, { replaceUrl: true });
    //     });

    //     return false;
    //   }
    //   return true;
    // });
  }
}
