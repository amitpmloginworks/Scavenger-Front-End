import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { SettingsPage } from '../pages/settings/settings';
import { DeleteAccountModalPage } from '../pages/delete-account-modal/delete-account-modal';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ServiceProvider } from '../providers/service/service';
import { HttpClientModule } from '@angular/common/http';
import{ HttpModule}from'@angular/http'
import { SearchPage } from '../pages/search/search';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';
import{ProgressBarComponent}from'../components/progress-bar/progress-bar'
import { Geolocation } from '@ionic-native/geolocation';
import{BarcodeScanner}from'@ionic-native/barcode-scanner';
import{ScannerqrPage}from'../pages/scannerqr/scannerqr'
import{PopoverpagePage}from'../pages/popoverpage/popoverpage'
import { LoadingdemoComponent } from '../components/loadingdemo/loadingdemo';
import{PaginationdemoPage}from'../pages/paginationdemo/paginationdemo'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    EditProfilePage,
    SettingsPage,
    DeleteAccountModalPage,
    UserProfilePage,
    SearchPage,
    ProgressBarComponent,
    ScannerqrPage,
    PopoverpagePage,LoadingdemoComponent,PaginationdemoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicSelectableModule,
    SelectSearchableModule,
    GooglePlacesAutocompleteComponentModule,
    IonicModule.forRoot(MyApp),
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    EditProfilePage,
    SettingsPage,
    DeleteAccountModalPage,
    UserProfilePage,
    SearchPage,
    ScannerqrPage,
    PopoverpagePage,LoadingdemoComponent,ProgressBarComponent,PaginationdemoPage
  ],
  providers: [
  Geolocation,
  BarcodeScanner,
    StatusBar,
    SplashScreen,
    File,
    FileTransfer,
    FileTransferObject,
    Camera,
 {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider
  ]
})
export class AppModule {}
