import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the PopoverpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popoverpage',
  templateUrl: 'popoverpage.html',
})
export class PopoverpagePage {
name
image 
totalpoints
ranking
constructor(public navCtrl: NavController, public navParams: NavParams,public viewctrl:ViewController) {
 this.name=this.navParams.get('name')
 this.image=this.navParams.get('image')
this.totalpoints=this.navParams.get('points')
 if(this.navParams.get('points')!=0)
 {
console.log('hii',this.navParams.get('id'))   
this.ranking=this.navParams.get('id')+1

 }
 else{
  console.log('hi',this.navParams.get('id'))
  this.ranking=0
 }
  


}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverpagePage');
  }
  close()
  {
    this.viewctrl.dismiss()
  }

}
