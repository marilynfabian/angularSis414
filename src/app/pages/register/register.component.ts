import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { DomManipulationService } from 'src/app/services/menu.service';
import { FbService } from 'src/app/services/fb.service';
import { SharedService } from 'src/app/services/share.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = '';
  pass: string = '';
  Apellidos: string = '';
  Nombres: string = '';
  dataUsuarios: any=[];
  imagenUrl: string | null = null;

  // Inyecta el servicio de perfil en el constructor
  constructor(
    private authService: AuthService,
    private router: Router,
    private perfilService: PerfilService,
    private domManipulationService: DomManipulationService, 
    private storage: FbService,
    private share: SharedService
  ) {}
  

  ngOnInit()
  {
    this.domManipulationService.initializeMenuBehavior();

    this.perfilService.getUsuarios().subscribe((data) => {
      this.dataUsuarios = data;
    
  });
}
imagenes: any[] = [];
cargarImagen(event: any) {
  let archivos = event.target.files;
  let reader = new FileReader();
  let nombre = "marilyn";

  reader.readAsDataURL(archivos[0]);
  reader.onloadend = () => {
    console.log(reader.result);
    this.imagenes.push(reader.result);

// aqui sube la imagen a Firebase Storage
    this.storage.subirImagen(nombre + "_" + Date.now(), reader.result)
      .then(urlImagen => {
        if (urlImagen) {
          console.log('Imagen subida exitosamente:', urlImagen);
          this.imagenUrl = urlImagen;
        } else {
          console.log('Error al subir la imagen.');
        }
      })
      .catch(error => {
        console.error('Error al subir la imagen:', error);
      });
  };
}

guardar() {
  this.authService.register(this.email, this.pass)
    .then(res => {
      const perfilData = {
        nombres: this.Nombres,
        apellidos: this.Apellidos,
        email: this.email,
        imagen: this.imagenUrl
      };
    
      this.share.setUserData(perfilData);

      // aqui esta llamando al método del servicio de perfil para guardar la información del usuario
      this.perfilService.postUsuario(perfilData).subscribe(perfilResponse => {
        console.log('Datos del perfil guardados:', perfilResponse);
      });

      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.log(error);
    });

    
}
}