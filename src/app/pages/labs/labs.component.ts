import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FbService } from 'src/app/services/fb.service';
//import { Storage} from '@angular/fire/storage';
import { PerfilService } from 'src/app/services/perfil.service';
@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent implements OnInit {

  user:any = "";
  

  constructor(private auth:AuthService, private router: Router, private storage: FbService, private perfil: PerfilService){

  }

  ngOnInit(){
    this.user = this.auth.getuser()?.displayName;
    if(this.user == null){
      this.user = this.auth.getuser()?.email;
    } 
  }

  salir(){
    this.auth.logOut().then(res=>{
      this.router.navigate(["/"]);
    }).catch(error=>{
      console.log(error);
    })
  }

}