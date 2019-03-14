import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { LoadingdemoComponent } from './loadingdemo/loadingdemo';
@NgModule({
	declarations: [ProgressBarComponent,
    LoadingdemoComponent],
	imports: [],
	exports: [ProgressBarComponent,
    LoadingdemoComponent]
})
export class ComponentsModule {}
