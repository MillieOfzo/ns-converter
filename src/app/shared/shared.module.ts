import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyDirective } from 'ngx-currency';
import { PipesModule } from './pipes/pipes.module';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

const customModules = [
  PipesModule,
  NgbModule,
  NgxCurrencyDirective,
  CanvasJSAngularChartsModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    customModules,
  ],
  exports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    customModules,
  ],
})
export class SharedModule {}
