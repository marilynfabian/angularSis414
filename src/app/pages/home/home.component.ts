import { Component, OnInit } from '@angular/core';
import { LenguajesService } from 'src/app/services/lenguajes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {NgForm} from '@angular/forms';
import { Conditional } from '@angular/compiler';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  dataUsers: any = [];
  dataLanguages: any = [];

  //post
  name:string = "";
  abrev:string= "";
  dataSource:any = [];

  constructor(private usersServices: UsuariosService, private lenguajesServices: LenguajesService, private language: LenguajesService){}

  editingId: string = ""; // ID de la fila que está siendo editada
  editedName: string = "";
  editedAbrev: string = "";
  //accion que va a hacer antes
  ngOnInit()
  {
    this.usersServices.getUsers().subscribe( (data) => {
      this.dataUsers = data;
    } );

    this.lenguajesServices.getLenguajes().subscribe( (data) => {
      let arrayLenguajes = [data];
      this.dataLanguages = arrayLenguajes;
    } );   

    this.language.getListLenguajes().subscribe((data) =>{
      for(var key in data)
      {
        var row = {id:key, abrev: data[key].abrev, name: data[key].name}
        this.dataSource.push(row)
        console.log(data[key].abrev)
        console.log(data[key].name)
      }
      console.log(this.dataSource)
    })
    
  }

  save()
  {
    let body = 
    {
      name: this.name,
      abrev: this.abrev
    }
    this.language.postLanguage(body).subscribe( (data) => {
      if(data!=null)
      {
        window.location.reload();
      }
    })
  }

  borrar(id:string){
    let aux = confirm("Esta Seguro de Borrar?")
    if(!aux) return
    this.language.deleteLanguage(id).subscribe( (data) => {
      if(data==null)
      {
        window.location.reload();
      }
    })
  }

  /*editar(id: string) {
    const filaAEditar = this.dataSource.find((data) => row.id === id);
    if (filaAEditar) {
      this.editedName = filaAEditar.name;
      this.editedAbrev = filaAEditar.abrev;
      this.editingId = id;
    } else {
      console.error('Fila no encontrada');
    }
  }*/

  actualizar(id:string){
    let aux = confirm("Esta Seguro de Actualizar")
    let body = 
    {
      abrev: this.editedAbrev,
      name: this.editedName,
    }    
    if(!aux) return
    this.language.updateLanguage(id, body).subscribe( (data) => {
      if(data!=null)
      {
        window.location.reload();
      }
    })
  }
}