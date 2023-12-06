import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  url: string ="https://apirest-b5100-default-rtdb.firebaseio.com/v1/usuarios";
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }

  getListUsuarios(): Observable<any> {
    let getUrl = this.url + ".json";
    return this.http.get(getUrl);
  }

  postUsuario(body: any): Observable<any> {
    let postUrl = this.url + ".json";
    return this.http.post(postUrl, body);
  }

  deleteUsuario(id: string): Observable<any> {
    let delUrl = this.url + "/" + id + ".json";
    return this.http.delete(delUrl);
  }

  updateUsuario(id: string, body: any): Observable<any> {
    let uptUrl = this.url + "/" + id + ".json";
    return this.http.put(uptUrl, body);
  }



  // Nuevo método para actualizar la URL de la imagen
  updateImagenUrl(id: string, imageUrl: string): Observable<any> {
    let uptImageUrl = this.url + "/" + id + ".json";
    return this.http.patch(uptImageUrl, { imageUrl });
  }
}

