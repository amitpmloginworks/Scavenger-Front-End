import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';

import { DeleteAccountModalPage } from '../delete-account-modal/delete-account-modal'; 



/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  openLeftMenu(){
    this.menuCtrl.enable(true);
  
    }


    submitBtn(){
      let modalTips = this.modalCtrl.create(DeleteAccountModalPage);  
      modalTips.onDidDismiss(data => {   });  modalTips.present();  
    }
}
