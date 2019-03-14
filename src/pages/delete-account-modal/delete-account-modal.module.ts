import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteAccountModalPage } from './delete-account-modal';

@NgModule({
  declarations: [
    DeleteAccountModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteAccountModalPage),
  ],
})
export class DeleteAccountModalPageModule {}
