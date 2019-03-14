import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginationdemoPage } from './paginationdemo';

@NgModule({
  declarations: [
    PaginationdemoPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginationdemoPage),
  ],
})
export class PaginationdemoPageModule {}
