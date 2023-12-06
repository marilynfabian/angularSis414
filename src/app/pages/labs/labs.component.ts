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

  imagenes: any[] = [];
  cargarImagen(event: any ){
    let archivos = event.target.files
    let reader = new FileReader();
    let nombre = "marilyn";

    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);
      this.storage.subirImagen(nombre + "_" + Date.now, reader.result).then(urlImagen =>{
        console.log(urlImagen);
        let usuario={
          neme: "jonathan",
          email:"sadasd",
          paswoord:"365541532",
          imgProfile: urlImagen
        }

      })
    }
  }

  
}
