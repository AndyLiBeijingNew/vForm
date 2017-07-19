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
  providers: [{provide: AuthenticationServiceInjectionToken, useClass: FakeAuthenticationService}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

