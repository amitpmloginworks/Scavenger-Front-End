import { Component ,NgZone,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import{Observable}from'rxjs/Rx'
import{ServiceProvider}from'../../providers/service/service'
import { IonicSelectableComponent } from 'ionic-selectable';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { Geolocation } from '@ionic-native/geolocation';


declare var google
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
 
placesdata
category=[]
placetype=[]
catplaces=[]
placesdata1=[]
locationlat
locationlng
public currentplaces
@ViewChild("search")
public searchElementRef;
currentlat
currentlng
distance
points
listplacesid
getlocationloading
reedemdata
count=0
loadingdisplay:boolean


  constructor( public geolocation: Geolocation, public alertCtrl:AlertController,
    private ngZone: NgZone,public loading:LoadingController,public service:ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

   
      

  }
  portChange(event: {
    component: SelectSearchableComponent,
    value: any 
}) {
  this.placesdata1=[]
   
  for(var i=0;i<this.placesdata.length;i++)
  {
    if(event.value.category==this.placesdata[i].PlaceType)
    {
       
      this.placesdata1.push({
        ImageUrl:this.placesdata[i].ImageUrl, 
        PlaceType:this.placesdata[i].PlaceType,
        create_date:this.placesdata[i].create_date, 
        location:this.placesdata[i].location ,
        name:this.placesdata[i].name ,
        points:this.placesdata[i].points,
        qrcode:this.placesdata[i].qrcode ,
        status:this.placesdata[i].status,
        __v:this.placesdata[i].__v ,
        _id:this.placesdata[i]._id
          })
         

    }


  }

}


  ionViewDidLoad() {
    this.loadingdisplay=true
    this.geolocation.getCurrentPosition().then((position) => {



    }, (err) => {
      console.log(err);
    });
    this.enterpage()
    
  }

  enterpage(){
    this.initMap() 
  
    
  //  let loading=this.loading.create({
  //    spinner:'hide',
  //    content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
  //    cssClass:'transparent'
  //  })
   Observable.of(this.loadingdisplay)
  .flatMap(()=>this.service.getSearchPlaces())
.subscribe(data=>{
   this.placesdata=data.qrcodename
   this.reedemdata=data.data
  for(var i=0;i<this.placesdata.length;i++)
  {
    
 
 
       
      this.placesdata1.push({
        ImageUrl:this.placesdata[i].ImageUrl, 
        PlaceType:this.placesdata[i].PlaceType,
        create_date:this.placesdata[i].create_date, 
        location:this.placesdata[i].location ,
        name:this.placesdata[i].name ,
        points:this.placesdata[i].points,
        qrcode:this.placesdata[i].qrcode ,
        status:this.placesdata[i].status,
        __v:this.placesdata[i].__v ,
        _id:this.placesdata[i]._id
          })
      
          console.log('placesjungle',this.placesdata1)

          // if(this.placesdata1[i].status==0)
          // {
              
          // }


  }

            // var status=document.getElementById('status')
            //     status.style.backgroundColor='red'
this.placetype= this.placesdata.map((word)=>{
  return word.PlaceType
})



  this.category = this.placetype.filter((v,i) => this.placetype.indexOf(v) === i)

for(var i=0;i<this.category.length;i++)
{
this.catplaces.push({id:i,category:this.category[i]})
console.log(this.catplaces)
}
 


  
// loading.dismiss()
this.loadingdisplay=false
})

  }
  getmyplace()
  {
    this.currentplaces='Fetching Your Location..'
    var place=(<HTMLInputElement>document.getElementById("searchInput")).value = this.currentplaces;
   
let observable=new Observable(observer=>{

this.geolocation.getCurrentPosition().then((position) => {
    
    // });
    var geocoder  = new google.maps.Geocoder();             // create a geocoder object
    var location  = new google.maps.LatLng(position.coords.latitude,position.coords.longitude );    // turn coordinates into an object          
    geocoder.geocode({'latLng': location}, function (results, status) {
     
    if(status == google.maps.GeocoderStatus.OK) { 
                // if geocode success
    var add=[{
      address:results[0].formatted_address,
      lat:position.coords.latitude,
      lng:position.coords.longitude
    }]
                // var add=results[0].formatted_address;         // if address found, pass to processing function
  
    observer.next(add)
 
  }
    })
  })

}
)
observable.subscribe(data=>{

 this.getcurrentplace(data)


}
)

  }
     
      
          initMap() {
    var input = document.getElementById('searchInput');
    var autocomplete = new google.maps.places.Autocomplete(input);

  }
  getcurrentplace(data)
  {
   
    this.currentplaces=data[0].address
   this.currentlat=data[0].lat
   this.currentlng=data[0].lng  

var place=(<HTMLInputElement>document.getElementById("searchInput")).value = this.currentplaces;

  }
  detail(event)
  {
console.log(event)
  }
  getreedemlatlng(i)
  {
console.log('location'+this.placesdata[i].location)
var input = (<HTMLInputElement>document.getElementById('searchInput')).value

   if(input=='')
   {
    const alert =this.alertCtrl.create({
      message: 'Please Choose the location First' ,
       buttons: ['OK']
     });
   alert.present()
   }
   else{

    var hightlight=document.getElementById('hightlight_'+i)
    hightlight.style.boxShadow='0 10px 30px -12px rgba(0,0,0,.42), 0 4px 25px 0 rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2)'
    hightlight.style.padding='3px'
    let observable=new Observable(observer=>{
    var geocoder = new google.maps.Geocoder();
    var address = this.placesdata1[i].location;
    this.points=this.placesdata1[i].points
    this.listplacesid=this.placesdata1[i]._id
     console.log('places',this.placesdata1[i])

    geocoder.geocode( { 'address': address}, function(results, status) {
    
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        
        var data=[{lat:latitude,lng:longitude}]
      observer.next(data)
      } 
    }); 
  }).subscribe(data=>{
    console.log('lng',data)
this.locationlat=data[0].lat
this.locationlng=data[0].lng
this.calculatedistance(this.locationlat,this.locationlng,i)
  })
}
  }
  calculatedistance(lat,lng,i)
  {
    var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat-this.currentlat);  // deg2rad below
  var dLon = this.deg2rad(lng-this.currentlng); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(this.currentlat)) * Math.cos(this.deg2rad(lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
 var d = R * c; // Distance in km
  this.distance=Math.round(d)

if(this.distance>5)
{

  const alert =this.alertCtrl.create({
    message: 'You can not Reedem Points of this place because your distance from current location is '+ this.distance+' miles.which is above then 5 miles' ,
     buttons: ['OK']
   });
 alert.present()
 var hightlight=document.getElementById('hightlight_'+i)
 hightlight.style.boxShadow='none'
    hightlight.style.padding='0px'
}
else
{
for(var j=0;j<this.reedemdata.length;j++)
{
if(this.listplacesid==this.reedemdata[j].listplaces&&localStorage['userid']==this.reedemdata[j].userid)
{
this.count=this.count+1
console.log(this.count)
}

}
if(this.count==0)
{
 var  latlng={latitude:this.currentlat,longitude:this.currentlng}
  
  let loading=this.loading.create({
    spinner:'hide',
    content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
    cssClass:'transparent' 
  })
  Observable.of(loading).flatMap(loading=>loading.present())
  .flatMap(()=>this.service.getreedemplaces(latlng,this.points,this.listplacesid))
  .subscribe(data=>{
    if(data.message=='User Earned 100%')
{

  const alert =this.alertCtrl.create({
    message: 'Congrats You Reedem '+this.points+' Points Successfully !!',
     buttons: [
       {
       text:'OK',
       handler:(data)=>{
        this.navCtrl.setRoot(SearchPage)
       }
       }
    
    
    
    ]
   });
  alert.present()
}
else{
 var quater=(this.points/100*25) 
 var quaterround=Math.round(quater) 
  const alert =this.alertCtrl.create({
    message: 'You earned '+quaterround+' points because someone already reedem this point!!',
     buttons: [
       {
       text:'OK',
       handler:(data)=>{
        this.navCtrl.setRoot(SearchPage)
       }
       }
    
    
    
    ]
   });
  alert.present()
}
  //   const alert =this.alertCtrl.create({
  //     message: 'Congrats You Reedem Points Successfully !!',
  //      buttons: [
  //        {
  //        text:'OK',
  //        handler:(data)=>{
  //         this.navCtrl.setRoot(SearchPage)
  //        }
  //        }
      
      
      
  //     ]
  //    });
  //  alert.present()
    loading.dismiss()
  
  }) 

}
else
{
  const alert =this.alertCtrl.create({
    message: 'You Already Reedem this point!!',
     buttons: [
       {
       text:'OK',
       handler:(data)=>{
        // this.navCtrl.setRoot(SearchPage)
       }
       }
    
    
    
    ]
   });
 alert.present()
}
}


}
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
