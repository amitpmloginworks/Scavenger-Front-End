import { Component } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams ,ActionSheetController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { NgZone } from '@angular/core';
import{Observable}from'rxjs/Rx'
import{ServiceProvider}from'../../providers/service/service'
import { Events } from 'ionic-angular';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
imagurl
userName
email
loadProgress = 0
loadactive:boolean
profilepic
password
  constructor(public events:Events,public service:ServiceProvider,public loadingCtrl:LoadingController,public _zone: NgZone,public filetransfer: FileTransfer,public camera:Camera,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl:ActionSheetController) {
 this.profilepic=localStorage['imageurl']
 this.userName=localStorage['username']
 this.email=localStorage['email']
this.loadactive=false 
this.password=localStorage['password']

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  uploadpicture()
  {
    let actionsheet = this.actionSheetCtrl.create({
      title: 'Image Upload!',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
       this.gallery()
        },
      }
        ,
      {
        text: 'Take A Snap',
        handler: () => {
        
         this.camera1()
        }
      }]
  
    })
    actionsheet.present(); 
  }
  gallery() {
    this.loadactive=true
    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.profilepic=imageData
    this.ProfileImageUp(imageData)
  
    }, (err) => {
    alert(err)
    })
  }
  
  
  
  camera1(){
    this.loadactive=true
  this.camera.getPicture({
    quality: 75,
    destinationType:this.camera.DestinationType.FILE_URI,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {
    this.profilepic=imageData
  
    this.ProfileImageUp(imageData)
     
  }, (err) => {
    alert(err)
  })
  }
  ProfileImageUp(ImgesP)
  {

  
         const filetransfers: FileTransferObject = this.filetransfer.create();
         let options: FileUploadOptions = {
           fileKey: 'file',
           fileName: 'filename.jpg',
           chunkedMode: false,    
           mimeType: "multipart/form-data",
           params:{'upload_preset':'wjnegjnc'}
          //  params: { 'upload_preset': 'waaxcfsv' }
         
         }
         filetransfers.onProgress((e) => {





          this._zone.run(() => {
          this.loadProgress = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
          })
          
          
          });
       
         filetransfers.upload(ImgesP,'https://api.cloudinary.com/v1_1/loginworks/upload', options)
           .then((data) => {
         
              this.profilepic=JSON.parse(data.response).secure_url
             
            
               this.loadactive=false
              
               
           }, (err) => {
            alert('error'+JSON.stringify(err))  
            alert(err)  
           })
     
  
  
  
  
  
  }
  update()
  {
   
    let loading=this.loadingCtrl.create(
      {
        spinner:'hide',
        content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
     cssClass:'transparent' 
      }
    )
    Observable.of(loading).flatMap(loading=>loading.present())
   .flatMap(()=>this.service.updateinfo(this.email,this.userName,this.password,this.profilepic))
   .subscribe(data=>{
     loading.dismiss()
     this.events.publish('user:created', localStorage['userid'],this.userName,this.profilepic);

   })


  }

}
