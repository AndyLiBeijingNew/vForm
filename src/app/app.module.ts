import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {VformModule} from './vform/vform.module';
import {IAuthenticationResult} from './vform/interfaces/IAuthenticationResult';
import {Observable} from 'rxjs/Observable';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AuthenticationServiceInjectionToken} from './vform/interfaces/AuthenticationServiceInjectionToken';
import {FakeAuthenticationService} from './fakes/FakeAuthenticationService';
import {VFormUrlsInjectionToken} from './vform/interfaces/VFormUrlsInjectionToken';
import {RtDataServiceInjectionToken} from './vform/interfaces/RtDataServiceInjectionToken';
import {FakeRtDataService} from './fakes/FakeRtDataService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    VformModule
  ],
  providers: [
    {provide: AuthenticationServiceInjectionToken, useClass: FakeAuthenticationService},
    {provide: RtDataServiceInjectionToken, useClass: FakeRtDataService},
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

