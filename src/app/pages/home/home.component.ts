import { Component, OnInit } from '@angular/core';
import { LenguajesService } from 'src/app/services/lenguajes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DomManipulationService } from 'src/app/services/menu.service';

// @ts-ignore

import * as jsfeat from 'jsfeat';
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
  row:any;
  itemEditar:any={name:'',abrev:''};

  idd:any;
  editing: boolean=false;

  
  constructor(private usersServices: UsuariosService, private lenguajesServices: LenguajesService, private language: LenguajesService,private domManipulationService: DomManipulationService){}

  ngOnInit()
  {
    this.domManipulationService.initializeMenuBehavior();

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

  
  editar(row:string){
    this.itemEditar=row;
  }
  
  editarForm() {
    
    let aux = confirm("¿Está seguro de actualizar?");
    if (!aux) return;
  
    let id = this.itemEditar.id; 
    let nuevosDatos = {
      name: this.itemEditar.name,
      abrev: this.itemEditar.abrev,
    };
  
    this.language.updateLanguage(id, nuevosDatos).subscribe((data) => {
      if (data != null) {
    
          window.location.reload();
        
      }
    });
  }
  
       }     


  


