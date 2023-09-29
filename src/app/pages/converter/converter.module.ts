import { NgModule } from '@angular/core';


import { ConverterPageRoutingModule } from './converter-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { ConverterPage } from './converter.page';

@NgModule({
  imports: [SharedModule,
    ConverterPageRoutingModule
  ],
  declarations: [ConverterPage]
})
export class ConverterPageModule {}
