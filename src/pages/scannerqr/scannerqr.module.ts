import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScannerqrPage } from './scannerqr';

@NgModule({
  declarations: [
    ScannerqrPage,
  ],
  imports: [
    IonicPageModule.forChild(ScannerqrPage),
  ],
})
export class ScannerqrPageModule {}
