import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,PopoverController} from 'ionic-angular';

import { EditProfilePage} from '../edit-profile/edit-profile'
import{SearchPage} from '../search/search'
import{Observable}from'rxjs/Rx'
import{ServiceProvider}from'../../providers/service/service'
import 'rxjs/add/operator/debounceTime'
import{FormControl}from'@angular/forms'
import{PopoverpagePage}from'../popoverpage/popoverpage'
import{ScannerqrPage}from'../scannerqr/scannerqr'
/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
browseState:any;
search:any
userimage
username
points
ranking
otherprofile=[]
otherprofiledublicate=[]
huntcategory=[]

searchterm:string='';
searchControl:FormControl;
items:any;
searching:any=false
countname=0
loadingdisplay:boolean
  constructor(public popCtrl:PopoverController,public loadingCtrl:LoadingController,public service:ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.browseState=0;
    this.search="Search Profile";
   this.searchControl=new FormControl();  
}

  ionViewDidLoad() {
  
    console.log('ionViewDidLoad UserProfilePage');
  let loading=this.loadingCtrl.create({
    spinner:'hide',
    content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
    cssClass:'transparent' 
  })
  Observable.of(loading).flatMap(loading=>loading.present())
  .flatMap(()=>this.service.getmyranking())
  .subscribe(data=>{
    loading.dismiss()
    console.log(data.data.length)
 for(var i=0;i<data.data.length;i++)
 {
   console.log('user',data.data[i].user.length)
  if(data.data[i].user.length==1)
  {
 
 if(data.data[i].user!=[])
 {


  if(localStorage['userid']==data.data[i].user[0]._id){
console.log('name',data.data[i].user[0].name)
this.username=data.data[i].user[0].name
this.userimage=data.data[i].user[0].profile_pic
this.points=data.data[i].totalpoints
// alert(this.points)
if(this.points!=0)
{
this.ranking=i+1
}
else{
this.ranking=0
}
this.countname=1
   }
   else{


console.log('id'+i)
this.otherprofile.push({name:data.data[i].user[0].name,profile_pic:data.data[i].user[0].profile_pic,points:data.data[i].totalpoints,id:i})
this.otherprofiledublicate=this.otherprofile  

   } 

  }
  else{
   
    this.username=localStorage['username']
    this.userimage=localStorage['imageurl']
    this.ranking=0
    this.points=0

  }

 }
  }
  if(this.countname==0)
  {
    this.username=localStorage['username']
    this.userimage=localStorage['imageurl']
    this.ranking=0
    this.points=0
  }
  
})
this.searchControl.valueChanges.debounceTime(700).subscribe(search=>{
this.searching=false
this.searchfilteredItems()
})
  
  
  
}
onSearchInput(){
        this.searching = true;
    }

searchfilteredItems()
{



  this.otherprofile=this.filterItems(this.searchterm)
 
}
 filterItems(searchTerm){
if(searchTerm)
{
  console.log('up')
        return this.otherprofile.filter((item) => {
           console.log('name',searchTerm)
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        }); 
     
      }
      else
      {
        console.log('down')
return this.otherprofile=this.otherprofiledublicate
      } 
        
 }
 popupdetail(id)
 {
  
let popover=this.popCtrl.create(PopoverpagePage,{name:this.otherprofile[id].name,
  image:this.otherprofile[id].profile_pic,
points:this.otherprofile[id].points,
id:this.otherprofile[id].id
})
popover.present()
 }

  browseOtherProfiles(){

    this.browseState=0;
    document.getElementById("browseOtherProfiles").style.background="#FFF"
    document.getElementById("text-browseOtherProfiles").style.color="#F7941E"
    document.getElementById("browseCategories").style.background="#F7941E"
    document.getElementById("text-browseCategories").style.color="#FFF"
      }

  browseCategories(){
    this.loadingdisplay=true
    this.browseState=1;
    document.getElementById("browseOtherProfiles").style.background="#F7941E"
    document.getElementById("text-browseOtherProfiles").style.color="#FFF"
    document.getElementById("browseCategories").style.background="#FFF"
    document.getElementById("text-browseCategories").style.color="#F7941E"
// let loading=this.loadingCtrl.create({
//   spinner:'hide',
//   content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
//   cssClass:'transparent'
// })
 Observable.of(this.loadingdisplay)
 .flatMap(()=>this.service.gethuntcategory())
 .subscribe(data=>{
this.loadingdisplay=false
   console.log('data',data.data)
  
   this.huntcategory=data.data
  
 })

 }


  editProfile(){
    this.navCtrl.push(EditProfilePage);
  }


  getItems(ev: any){
    console.log("called")
  }

  searchPage(){
    // this.navCtrl.push(SearchPage);
  }
  qrscan()
  {
this.navCtrl.push(ScannerqrPage)
  }
}
