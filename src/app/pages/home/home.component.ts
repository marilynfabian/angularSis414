import { Component, OnInit } from '@angular/core';
import { LenguajesService } from 'src/app/services/lenguajes.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DomManipulationService } from 'src/app/services/menu.service';
import { SharedService } from 'src/app/services/share.service';
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

  user:any = "";
  email: string ="";
  pass: string ="";

  constructor(
    private usersServices: UsuariosService, 
    private lenguajesServices: LenguajesService, 
    private language: LenguajesService,
    private domManipulationService: DomManipulationService, 
    private authService: AuthService,
    private sharedService: SharedService
    )
    {}
    
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

  save() {
    if (this.authService.getuser() && this.sharedService.getLoading()) {
      let body = {
        name: this.name,
        abrev: this.abrev
      };
      this.language.postLanguage(body).subscribe((data) => {
        if (data != null) {
          const newItem = { id: data.id, ...body };
          this.dataSource.push(newItem);
        }
      },
      (error) => {
        console.error('Error al guardar:', error);
      });
    } else {
      console.error('Usuario no autenticado. No se puede guardar.');
    }
  }
  
  borrar(id: string) {
    if (this.authService.getuser() && this.sharedService.getLoading()){
      let aux = confirm("¿Está seguro de borrar?");
      if (!aux) return;
      this.language.deleteLanguage(id).subscribe((data) => {
        if (data == null) {
          const index = this.dataSource.findIndex((item: { id: string }) => item.id === id);
          if (index !== -1) {
            this.dataSource.splice(index, 1);
          }
        }
      },
      (error) => {
        console.error('Error al eliminar:', error);
      }
      );
    } else {
      console.error('Usuario no autenticado. No se puede eliminar.');
    }
  }
  
  editar(row: string) {
    if (this.authService.getuser() && this.sharedService.getLoading()) {
      this.itemEditar = row;
    } else {
      console.error('Usuario no autenticado. No se puede editar.')
    }
  }
  
  editarForm() {
    if (this.authService.getuser() && this.sharedService.getLoading()) {
      let aux = confirm("¿Está seguro de actualizar?");
      if (!aux) return;
  
      let id = this.itemEditar.id;
      let nuevosDatos = {
        name: this.itemEditar.name,
        abrev: this.itemEditar.abrev,
      };
  
      this.language.updateLanguage(id, nuevosDatos).subscribe((data) => {
        if (data != null) {
          const index = this.dataSource.findIndex((item: { id: string }) => item.id === id);
        if (index !== -1) {
          this.dataSource[index] = { id, ...nuevosDatos };
        }
      }});
    } else {
      console.error('Usuario no autenticado. No se puede actualizar.');
    }
  }
  
  
       }     


  


