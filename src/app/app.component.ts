import { Component,ViewChild } from '@angular/core';
import { Platform,Nav ,MenuController, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { SettingsPage } from '../pages/settings/settings';
import { DeleteAccountModalPage } from '../pages/delete-account-modal/delete-account-modal';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { SearchPage } from '../pages/search/search';
import { Events } from 'ionic-angular';
import{Observable}from'rxjs/Rx'
import{ServiceProvider}from'../providers/service/service'
import { LoadingdemoComponent } from '../components/loadingdemo/loadingdemo';
import{PaginationdemoPage}from'../pages/paginationdemo/paginationdemo'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav)nav:Nav
  rootPage:any = WelcomePage;
  pages: Array<{title: string, component: any,logo:string}>;
  icon1;
  icon2;
  icon3;
  icon4;
  icon5;
  icon6;
  imageprofilepic='assets/imgs/logo_sign_in.png'
  username
  constructor(public service:ServiceProvider,public loading:LoadingController,public events: Events,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl:MenuController) {
  platform.ready().then(() => {
  // Okay, so the platform is ready and our plugins are available.
  // Here you can do any higher level native things you might need.
  statusBar.styleDefault();
  splashScreen.hide();
  });
  
  this.icon1='assets/icon/home.png'
  this.icon6='assets/icon/search1.png'
  this.icon2='assets/icon/user_profile.png'
  this.icon3='assets/icon/edit_profile.png'
  this.icon4='assets/icon/settings.png'
  this.icon5='assets/icon/logout.png'
  
  this.pages = [
  { title: 'Home', component:HomePage, logo:this.icon1},
  {title: 'Search',component:SearchPage,logo:this.icon6},
  { title: 'User Profile', component:UserProfilePage, logo:this.icon2},
  { title: 'Edit Profile', component:EditProfilePage, logo:this.icon3},
  {title: 'Settings',component:SettingsPage,logo:this.icon4},
  {title: 'Logout',component:WelcomePage,logo:this.icon5}
  ];
  events.subscribe('user:created', (user, username,imageurl) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log('Welcome', user, 'at',username,'in',imageurl );
    localStorage['onetimeuser']=user
     localStorage['imageurl']=imageurl
     localStorage['username']=username
     if(localStorage['imageurl'])
     {
       if(localStorage['imageurl']=='assets/imgs/add_pic.png')
       {
        this.imageprofilepic='assets/imgs/logo_sign_in.png'
       }
       else{
         
         this.imageprofilepic=localStorage['imageurl']
       }
     
     }
     
     if(localStorage['username'])
     {
    
     this.username=localStorage['username']
     }
  });
  // events.subscribe('user2:createdimage',(profilepic)=>{
  //   localStorage['profilepic']=profilepic
  // })
if(localStorage['onetimeuser'])
{
  this.rootPage=HomePage
} 

if(localStorage['imageurl'])
{
  if(localStorage['imageurl']=='assets/imgs/add_pic.png')
  {

  }
  else{
   
    this.imageprofilepic=localStorage['imageurl']
  }

}

if(localStorage['username'])
{

this.username=localStorage['username']
}


}
  
  openPage(page){
  console.log(page.component)
  console.log(page.title,"1")
 if(page.title=='Logout')
 {
  
   let loading=this.loading.create({
  spinner:'hide',
  content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
  cssClass:'transparent' 
   })
   Observable.of(loading).switchMap(loading=>loading.present())
   .switchMap(()=>this.service.logout())
   .subscribe(data=>{
     console.log(data)
   })
   loading.dismiss()
  // this.nav.push(page.component);
this.nav.setRoot(page.component) 
}
 else{

  this.nav.setRoot(page.component) 
  // this.nav.push(page.component);
 }
  this.menuCtrl.close()
 
  }
  
  logout(){
  this.nav.setRoot(LoginPage)
  this.menuCtrl.close()
  }
  
  closeMenu(){
  this.menuCtrl.close();
  }

}

