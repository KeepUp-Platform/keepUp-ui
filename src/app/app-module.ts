import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SharedModule } from './shared-module';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([jwtInterceptor])) 
  ],
  bootstrap: [App]
})
export class AppModule { }