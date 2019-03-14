const HTTP_TIMEOUT:number=10000;
export interface Enviroment{
    mainApi:String,
    timeout:number
}
export const Test:Enviroment={
  mainApi:'https://scvanger2app.herokuapp.com/user',
//  mainApi:'http://localhost:3000/user',
timeout:HTTP_TIMEOUT

}
export const Live:Enviroment={
mainApi:'https://secure-escarpment-31573.herokuapp.com/user',
timeout:HTTP_TIMEOUT

}
export const ENV:Enviroment=Test;