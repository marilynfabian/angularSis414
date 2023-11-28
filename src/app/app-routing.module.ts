import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LabsComponent } from './pages/labs/labs.component';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: "", component:HomeComponent },
  { path:"register", component:RegisterComponent},
  {path: "login", component:LoginComponent},
  {path: "labs", component:LabsComponent,  ...canActivate(()=>redirectUnauthorizedTo(["/"]))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


