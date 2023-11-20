import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LenguajesService {

  //url: string ="https://apirest-b5100-default-rtdb.firebaseio.com/v1/topList.json"
  url: string ="https://apirest-b5100-default-rtdb.firebaseio.com/v1/topList"  
  constructor(private http: HttpClient) { }

  getLenguajes(): Observable<any>
  {
      return this.http.get(this.url)
  }

  getListLenguajes(): Observable<any>
  {
    let getUrl = this.url + ".json"
    return this.http.get(getUrl);
  }


  postLanguage(body:any): Observable <any>
  {
    let postUrl = this.url + ".json"
    return this.http.post(postUrl, body)
  }

  deleteLanguage(id: string): Observable <any>
  {
    let delUrl = this.url + "/" + id + ".json"
    return this.http.delete(delUrl)
  }

  updateLanguage(id:string, body:any): Observable <any>
  {
    let uptUrl = this.url + "/" + id + ".json"
    return this.http.put(uptUrl, body)
  }

}
