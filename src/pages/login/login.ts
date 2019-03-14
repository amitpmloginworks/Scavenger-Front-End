import { Component } from '@angular/core';
import { AlertController,LoadingController,IonicPage, NavController, NavParams ,ActionSheetController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import{ServiceProvider}from'../../providers/service/service'
import{Observable}from'rxjs/Rx'
import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { HomePage } from '../home/home';
import { NgZone } from '@angular/core';
import { Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
public signinState:any;
imageProfile
signUpForm
loginEmail
loginPassword
profilepic='assets/imgs/add_pic.png'
public navigateid
loadProgress = 0
loadactive:boolean
lat
lng
  constructor(public geolocation:Geolocation,public events: Events,public _zone: NgZone,public alertCtrl:AlertController,public formBuilder:FormBuilder,public service:ServiceProvider,public loadingCtrl:LoadingController,public filetransfer: FileTransfer,public camera:Camera ,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl:ActionSheetController) {
   delete localStorage['onetimeuser']
   delete localStorage['username']
   delete localStorage['imageurl']
    this.loadactive=false
    this.navigateid=this.navParams.get('navigateid')
    this.signinState=1

  
       let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
       let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    this.signUpForm=formBuilder.group({
      userName:['',Validators.compose([Validators.maxLength(30),Validators.minLength(1),Validators.required])],
        FirstName:['',Validators.compose([Validators.maxLength(30),Validators.required])],
         Surname:['',Validators.compose([Validators.maxLength(30),Validators.required])],
         password:['',Validators.compose([Validators.maxLength(30),Validators.pattern(passwordRegex),Validators.required])],
         email:['',Validators.compose([Validators.maxLength(30),Validators.pattern(emailRegex),Validators.required])]
  })
 
}
SignUp()
  {
    

   let loading=this.loadingCtrl.create({
     spinner:'hide',
     content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
     cssClass:'transparent' 
   })
   Observable.of(loading).flatMap(loading=>loading.present())
   .flatMap(()=>this.service.SignUp(this.signUpForm.value,this.profilepic))
   .subscribe(data=>{
     loading.dismiss()
      if(data.message=='Email ID exist')
    {
  
      const alert =this.alertCtrl.create({
        message: data.message,
         buttons: ['OK']
       });
     alert.present()

    }
    else{
     this.signin()
    }
   })
  }
  login()
  {
    localStorage['password']=this.loginPassword
let loading=this.loadingCtrl.create({
     spinner:'hide',
     content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
     cssClass:'transparent' 
   })
   Observable.of(loading).flatMap(loading=>loading.present())
   .flatMap(()=>this.service.login(this.loginEmail,this.loginPassword))
   .subscribe(data=>{
    console.log('message'+data.message)
    
    // this.events.publish('user:created', data.user_id,data.data.username,data.data.image_url);
      loading.dismiss()
      console.log('hi')
    if(data.message=='Email ID not exist')
    {
    
      const alert =this.alertCtrl.create({
       message: data.message,
        buttons: ['OK']
      });
    alert.present()
    }
    else if(data.message=='Auth Failed')
    {
      const alert =this.alertCtrl.create({
        message: 'Password Incorrect',
         buttons: ['OK']
       });
     alert.present()
    }
    
    else if(data.user_id){
      localStorage['userid']=data.user_id
    localStorage['email']=data.data.email
      this.events.publish('user:created', data.user_id,data.data.username,data.data.image_url);
     this.loginactive()
     
    }
    })
  }
  forgetpassword()
  {

 const alert=  this.alertCtrl.create({
  title: 'Forget Password',
  inputs: [
    {
      name: 'Email',
      placeholder: 'Email-Id'
    }
  ],
  buttons: [
    {
      text: 'Submit',
      role: 'ok',
       handler: (data) => {
          
              this.sendemail(data.Email)
          }
    }
  ]
});

alert.present();

  }
  sendemail(email)
  {
       let loading=this.loadingCtrl.create({
     spinner:'hide',
     content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
     cssClass:'transparent' 
   })
   Observable.of(loading).flatMap(loading=>loading.present())
   .flatMap(()=>this.service.forgetpassword(email))
   .subscribe(data=>{
     loading.dismiss()
 if(data.message=='Email ID not exist')
 {
  const alert=  this.alertCtrl.create({
    title:data.message,
    buttons: [
      {
        text:'ok',
        role: 'ok',
         handler: (data) => {
            
              
            }
      }
    ]
  });
  alert.present()
 }
 else{

     const alert=  this.alertCtrl.create({
      title: 'Email Sent To Your Account !!',
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
           handler: (data) => {
              
                
              }
        }
      ]
    });
    alert.present()
  }
  }) 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
        if(this.navigateid==1)
    {
     this.signin()
    }
    else{
      this.signup()
    }
  }


  signin(){
this.signinState=1
document.getElementById("signin").style.backgroundColor="#27CAFB" 
document.getElementById("signup").style.backgroundColor="#FFF" 
document.getElementById("text-signin").style.color="#FFF" 
document.getElementById("text-signup").style.color="#27CAFB" 

  }



  signup(){
    this.signinState=0
    document.getElementById("signup").style.backgroundColor="#27CAFB" 
    document.getElementById("signin").style.backgroundColor="#FFF" 
    document.getElementById("text-signup").style.color="#FFF" 
    document.getElementById("text-signin").style.color="#27CAFB" 
   
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
  loginactive()
  {
    let loading=this.loadingCtrl.create({
      spinner:'hide',
      content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
      cssClass:'transparent' 
       })
       Observable.of(loading).switchMap(loading=>loading.present())
       .switchMap(()=>this.service.loginactive())
       .subscribe(data=>{
         console.log(data)
         this.navCtrl.setRoot(HomePage)
       })
       loading.dismiss()
  }
  
}
