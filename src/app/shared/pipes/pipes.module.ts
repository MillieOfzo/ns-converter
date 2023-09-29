import { NgModule } from '@angular/core';
import { TimerLabelPipe } from './timer-label.pipe';

@NgModule({
    declarations: [
        TimerLabelPipe,
    ],
    imports: [],
    exports: [
        TimerLabelPipe,
    ],
})
export class PipesModule { }
