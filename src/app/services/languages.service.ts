import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  url: string = "https://apirest-d1d1a-default-rtdb.firebaseio.com/v1/topList";

  constructor(private http: HttpClient) { }

  getListLanguges(): Observable<any>
  {
    let getUrl = this.url + ".json"
    return this.http.get(getUrl);
  }

  postLanguage(body:any): Observable<any>
  {
    let postUrl = this.url + ".json"
    return this.http.post(postUrl, body)
  }

  deleteLanguage(id:string): Observable<any>
  {
    let delUrl = this.url + "/" + id + ".json"
    return this.http.delete(delUrl)
  }

  updateLanguage(id:string, body:any): Observable<any>
  {
    let uptUrl = this.url + "/" + id + ".json"
    return this.http.put(uptUrl, body)
  }  
}
