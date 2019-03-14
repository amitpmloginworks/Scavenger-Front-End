import { Component,Input } from '@angular/core';

/**
 * Generated class for the LoadingdemoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loadingdemo',
  templateUrl: 'loadingdemo.html'
})
export class LoadingdemoComponent {

  text: string;

  users: any;
  fakeUsers: Array<any> = new Array(5);
  constructor() {

  }

}
