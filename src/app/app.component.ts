import { Component } from '@angular/core';
import { ThemeProvider } from './shared/providers';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  themeHeader: string = 'assets/images/logo-small.svg';

  style = {
    background: '',
  };

  currentTime = new Date();

  public appPages = [
    { title: 'Converter', url: '/converter', icon: 'card' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private themeProvider: ThemeProvider) {
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000); // minuut

    this.themeProvider.getSideMenuBackground().subscribe((bgPath) => {
      this.style.background = `url(${bgPath}) center no-repeat`;
    });
  }
}
