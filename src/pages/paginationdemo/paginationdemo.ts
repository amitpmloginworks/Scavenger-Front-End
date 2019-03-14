import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import{ServiceProvider}from '../../providers/service/service'
import{Observable}from'rxjs/Rx'
/**
 * Generated class for the PaginationdemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paginationdemo',
  templateUrl: 'paginationdemo.html',
})
export class PaginationdemoPage {
  users = [];
  page = 0;
  maximumPages = 3;
  constructor(public service:ServiceProvider,public loading:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    this.loadUsers();
  
  }
   
 loadUsers(infiniteScroll?)
 {

// Observable.of()
// .flatMap(()=>this.service.loaddata(this.page))
// .subscribe(res=>{
//   this.users=this.users.concat(res['results']);
//   if(infiniteScroll)
//   {
// infiniteScroll.complete();
//   }

// })

this.service.loaddata(this.page).subscribe(res=>{
  this.users=this.users.concat(res['results']);
  console.log(this.users)
  if(infiniteScroll)
  {
infiniteScroll.complete();
  }
})



 }

 loadMore(infiniteScroll)
 {
this.page++;
this.loadUsers(infiniteScroll);

if(this.page===this.maximumPages)
{
infiniteScroll.enable(false);
}


 }




  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginationdemoPage');
  }

}
