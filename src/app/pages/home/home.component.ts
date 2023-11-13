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
  data:any = [];

  constructor(private language: LanguagesService){}

  ngOnInit()
  {
    this.language.getListLanguges().subscribe( (data) => {
      console.log(data)
    } )
  }

  save()
  {
    var body = 
    {
      name: this.name,
      abrev: this.abrev
    }
    this.language.postLanguage(body).subscribe( (data) => {
      console.log(data)   
    })
  }
}


