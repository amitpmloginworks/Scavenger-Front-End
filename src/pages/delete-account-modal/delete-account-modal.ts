import { Component } from '@angular/core';
import {LoadingController, IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import{ServiceProvider}from'../../providers/service/service'
import{Observable}from'rxjs/Rx'
import { WelcomePage } from '../welcome/welcome';
/**
 * Generated class for the DeleteAccountModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete-account-modal',
  templateUrl: 'delete-account-modal.html',
})
export class DeleteAccountModalPage {

  constructor(public loading:LoadingController,public service:ServiceProvider,public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteAccountModalPage');
  }
  okBtn(){

    let loading=this.loading.create({
      spinner:'hide',
      content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
      cssClass:'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.service.deleteaccount()).subscribe(data=>{
    
      this.viewCtrl.dismiss();
      loading.dismiss()
      this.navCtrl.setRoot(WelcomePage)
    })

  }
}
