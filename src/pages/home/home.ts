import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController ,LoadingController} from 'ionic-angular';
import{ScannerqrPage}from'../scannerqr/scannerqr'
import { Geolocation } from '@ionic-native/geolocation';
import{ServiceProvider}from'../../providers/service/service'
import{Observable}from'rxjs/Rx'
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
@ViewChild('map') mapElement:ElementRef;
map:any;
datapins
datapinsarray=[]
datapinarraydublicate
rank1
rank2
rank3
rank4
rankpic1
rankpic2
rankpic3
rankpic4
datahunt
lat
lng
  constructor(public service:ServiceProvider,public geolocation: Geolocation,public Loading:LoadingController,public navCtrl: NavController) {
   
    let loading=this.Loading.create({
      spinner:'hide',
      content:'<img src="assets/imgs/RepentantGlamorousEquine-max-1mb.gif" style="height:100px!important">',
      cssClass:'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.service.homedetail()).subscribe(data=>{
      this.datapins=data.data
      this.datahunt=data.datahunt

      console.log('datahunt',this.datahunt)
      this.dataresullt()
      this.rank1=data.ranking[0].user[0].name
      this.rank2=data.ranking[1].user[0].name
      this.rank3=data.ranking[2].user[0].name
      this.rank4=data.ranking[3].user[0].name
      this.rankpic1=data.ranking[0].user[0].profile_pic
this.rankpic2=data.ranking[1].user[0].profile_pic
 this.rankpic3=data.ranking[2].user[0].profile_pic
 this.rankpic4=data.ranking[3].user[0].profile_pic


 
     loading.dismiss()
     
    })

  }
  ionViewDidLoad(){

    this.geolocation.getCurrentPosition().then((position) => {
      this.lat=position.coords.latitude
      this.lng=position.coords.longitude
  
    })
    
}
dataresullt()
{
  var geocoder = new google.maps.Geocoder();
  let observercrete=new Observable((obeserver)=>{
    for(var i=0;i<this.datapins.length;i++)
    {
    if(this.datapins[i].status==1)
    {
   
     geocoder.geocode( { 'address': this.datapins[i].location}, (results, status)=> {
    
  
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        
       
     this.datapinsarray.push({lat:latitude,lng:longitude,location:results[0].formatted_address})
     obeserver.next(this.datapinsarray)
      } 
    }); 
  
  }
    }
    
  })
  observercrete.subscribe((data)=>{
  this.datapinarraydublicate=data
    console.log(this.datapinarraydublicate)
    this.loadMap(this.datapinarraydublicate) 
  })
 
    
   
}


loadMap(datapinarraydublicate)
{

 

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 10,
  center: new google.maps.LatLng(this.lat, this.lng),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < datapinarraydublicate.length; i++) {  
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(datapinarraydublicate[i].lat,datapinarraydublicate[i].lng),
    map: map
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent(datapinarraydublicate[i].location);
      infowindow.open(map, marker);
    }
  })(marker, i));}
// })
}

addMarker(){

  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });

  let content = "<h4>Information!</h4>";          

  this.addInfoWindow(marker, content);

}
addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

  qrscan()
  {
this.navCtrl.push(ScannerqrPage)
  }
}
