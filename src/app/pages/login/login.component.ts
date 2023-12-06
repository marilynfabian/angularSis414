import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/share.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user:string="";
  email: string ="";
  pass: string ="";
constructor(private authService:AuthService, private router:Router, private sharedService: SharedService){}

login(){

  //this.sharedService.setLoading(true);
  this.authService.loginwithcredentials(this.email, this.pass).then(res=>{
    this.sharedService.setLoading(true);
    this.router.navigate(["/"]);
  }).catch(error=>{
    this.sharedService.setLoading(false);
  });
}
  
loginGoogle()
{
  this.authService.loginwithgoogle().then(res=>{
    this.router.navigate(["/"]);
  }).catch(error=>{
    console.log(error)
  });
}

}
