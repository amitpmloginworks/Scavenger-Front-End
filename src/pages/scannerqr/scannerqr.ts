import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import{BarcodeScanner}from'@ionic-native/barcode-scanner'
import{Observable}from'rxjs/Rx'
import{ServiceProvider}from'../../providers/service/service'
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { Camera } from '@ionic-native/camera';
 
declare var google
/**
 * Generated class for the ScannerqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scannerqr',
  templateUrl: 'scannerqr.html',
})
export class ScannerqrPage {
  placedetail
  ImageUrl
name
 PlaceType
location
 points
 getdetail:boolean
 latlng
 placeid
 datastatus:boolean
 reedemdata
 count=0
  constructor(public camera:Camera,public alertCtrl:AlertController,public geolocation: Geolocation,public service:ServiceProvider,public loading:LoadingController,public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
  this.getdetail=false
  this.datastatus=false
  let observ=new Observable(observer=>{this.geolocation.getCurrentPosition().then((position) => {
    console.log(position.coords.latitude+'posssssss'+position.coords.longitude)
   var latlng=({lat:position.coords.latitude,lng:position.coords.longitude})
    observer.next(latlng)
  })
    })
    observ.subscribe((data)=>{
 this.latlng=data
      console.log(this.latlng.lat)
    })
  //  setTimeout(()=>{this.tap()},1000) 

  }

  ionViewDidLoad() {
  

  // this.barcode('56377')
  
  }

  tap()
  {
    console.log('ionViewDidLoad ScannerqrPage');
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode(barcodeData)
     }).catch(err => {
   this.barcode(err)
     });
  }
  
  barcode(barcodeData)
  {

var code=barcodeData.text
// var code=barcodeData












let loading=this.loading.create({
  spinner:'hide',
  content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
  cssClass:'transparent'
})
Observable.of(loading).flatMap(loading=>loading.present())
.flatMap(()=>this.service.scandata(code)).subscribe(data=>{
  this.reedemdata=data.matchdata
  for(var j=0;j<this.reedemdata.length;j++)
{
if(data.data[0]._id==this.reedemdata[j].listplaces&&localStorage['userid']==this.reedemdata[j].userid)
{
this.count=this.count+1
console.log(this.count)
}

}
if(this.count==0)
{

  this.getdetail=true

 
  
  this.ImageUrl=data.data[0].ImageUrl
  this.name=data.data[0].name
  this.PlaceType=data.data[0].PlaceType
  this.location=data.data[0].location
  this.points=data.data[0].points
  this.placeid=data.data[0]._id
 
  loading.dismiss()
}
else{
  loading.dismiss()
  this.datastatus=true
}




})





  }
  test()
  {
    let loading=this.loading.create({
      spinner:'hide',
      content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
      cssClass:'transparent'
      })
      Observable.of(loading).flatMap(loading=>loading.present())
      .flatMap(()=>this.service.getreedemplaces(this.latlng,this.points,this.placeid)).subscribe(data=>{
      loading.dismiss()
      
      if(data.message=='User Earned 100%')
      {
      
      const alert =this.alertCtrl.create({
      message: 'Congrats You Reedem '+this.points+' Points Successfully !!',
      buttons: [
      {
      text:'OK',
      handler:(data)=>{
      this.navCtrl.setRoot(HomePage)
      }
      }
      
      
      
      ]
      });
      alert.present()
      }
      else{
      var quater=(this.points/100*25) 
      const alert =this.alertCtrl.create({
      message: 'You earned '+quater+' points because someone already reedem this point!!',
      buttons: [
      {
      text:'OK',
      handler:(data)=>{
      this.navCtrl.setRoot(HomePage)
      }
      }
      
      
      
      ]
      });
      alert.present()
      }
      })
  }

}
