import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Http,Headers,RequestOptions}from'@angular/http'
import{ENV}from'../../app/env'
import{Observable}from'rxjs/Rx'

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }

 SignUp(signUpForm,profilepic)
 {
  //  let headers=new Headers({'Access-Control-Request-Method':'application/json','Content-Type':'application/x-www-form-urlencoded' })
  // let requestOptions=new RequestOptions({headers:headers})
  let param=({
"email":signUpForm.email,
"password":signUpForm.password,
"username":signUpForm.userName,
"name":signUpForm.FirstName,
"surname":signUpForm.Surname,
"profile_pic":profilepic,
"role":"user"
})
return this.http.post(ENV.mainApi+'/signup',param).timeout(ENV.timeout)
.map((data)=>{
  return data.json()
})


}
login(email,password)
{
 let param=({
"email":email,
"password":password
})
return this.http.post(ENV.mainApi+'/login',param).timeout(ENV.timeout)
.map((data)=>{
  console.log('data',data)
  return data.json()
},
  err => {
    
    console.error('Oops:', err.message);
  }


)
}
forgetpassword(email)
{
 let param=({
"email":email
})
return this.http.post(ENV.mainApi+'/reset_password',param).timeout(ENV.timeout)
.map((data)=>{
  return data.json()
})
}
getSearchPlaces()
{
 return this.http.get(ENV.mainApi+'/placesdetail').timeout(ENV.timeout).map((data)=>{
   return data.json()
 }) 
}

getreedemplaces(latlng,points,placeid)
{
  let param=({
    "latlng":latlng,
    "userid":localStorage['userid'],
    "listplaces":placeid,
    "Points":points 
    })
    return this.http.post(ENV.mainApi+'/getreedempoints',param).timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
}
scandata(Points)
{
  let param=({
    "Points":Points
  })
  return this.http.post(ENV.mainApi+'/getscanreedempoints',param).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}

getmyranking()
{
   return this.http.get(ENV.mainApi+'/getmyranking')
  .map((data)=>{
   return data.json()
  })
}
gethuntcategory()
{
   let param=({
    "userid":localStorage['userid']
  })
return this.http.post(ENV.mainApi+'/gethuntcategory',param).timeout(ENV.timeout)
.map((data)=>{
  return data.json()
})
}

logout()
{
  let param=({
  "userid":localStorage['userid']
    })
    return this.http.post(ENV.mainApi+'/logout',param).timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
}
loginactive() {
let param=({
  "userid":localStorage['userid']
    })
    return this.http.post(ENV.mainApi+'/loginactive',param).timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })

  }
updateinfo(email,username,password,profilepic)
{
  let param=({
    "userid":localStorage['userid'],
    "email":email,
    "username":username,
    "password":password,
    "profile_pic":profilepic
  })
  return this.http.post(ENV.mainApi+'/update_signup',param).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}
deleteaccount()
{
  let param=({
    "userid":localStorage['userid']
  })
  return this.http.post(ENV.mainApi+'/deleteaccount',param).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}

homedetail()
{
  let param=({
    "userid":localStorage['userid']
  })
  return this.http.post(ENV.mainApi+'/homedetail',param).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}
loaddata(page)
{
  return this.http.get('https://randomuser.me/api/?results=20&page='+page)
  .map((data)=>{
    return data.json()
  })
}



}
