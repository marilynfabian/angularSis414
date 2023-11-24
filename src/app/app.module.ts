import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { Test1Component } from './test1/test1.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const config = {
  apiKey: "AIzaSyBZfGzE_LIcFC1gn0F56MV-TvXw8fG3wHo",
  authDomain: "apirest-d1d1a.firebaseapp.com",
  databaseURL: "https://apirest-d1d1a-default-rtdb.firebaseio.com",
  projectId: "apirest-d1d1a",
  storageBucket: "apirest-d1d1a.appspot.com",
  messagingSenderId: "677749139321",
  appId: "1:677749139321:web:5dbb2c829d51dd4c4871a8",
  measurementId: "G-QCCG4KM5GW"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Test1Component,
    RegisterComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,    
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
