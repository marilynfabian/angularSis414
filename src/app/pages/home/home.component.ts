import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/services/languages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  name:string = "Python";
  abrev:string = "Py";
  dataSource:any = [];

  constructor(private language: LanguagesService){}

  ngOnInit()
  {
    this.language.getListLanguges().subscribe( (data) => {
      for(var key in data)
      {
        var row = {id:key, abrev: data[key].abrev, name: data[key].name}
        this.dataSource.push(row)
      }
      console.log(this.dataSource)
    } )
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
    let aux = confirm("Esta Seguro de Borrar")
    if(!aux) return
    this.language.deleteLanguage(id).subscribe( (data) => {
      if(data==null)
      {
        window.location.reload();
      }
    })
  }

  actualizar(id:string){
    let aux = confirm("Esta Seguro de Actualizar")
    let body = 
    {
      abrev: "test Upt abrev",
      name:  "test Upt name"
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


