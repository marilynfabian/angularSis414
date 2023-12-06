import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { DomManipulationService } from 'src/app/services/menu.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    private storage:AngularFireStorage
  ) {}

  ngOnInit()
  {
    this.domManipulationService.initializeMenuBehavior();

    this.perfilService.getUsuarios().subscribe((data) => {
      // Asigna directamente el array de datos
      this.dataUsuarios = data;
    
  });
}
onUpload(e:any){
  //console.log('subir', e.target.files[0])
  const id =Math.random().toString(36).substring(2);
  const file= e.target.file[0];
  const filePath = 'upload/imagen.png';
  const ref= this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);

}

  guardar() {
    // Llama al método de registro del servicio de autenticación
    this.authService.register(this.email, this.pass)
      .then(res => {
        // Después de registrar al usuario, guarda datos en el servicio de perfil
        const perfilData = {
          nombres: this.Nombres,
          apellidos: this.Apellidos,
          email: this.email,
          imagen: this.imagenUrl
          // Puedes agregar más campos según sea necesario
        };

        // Llama al método del servicio de perfil para guardar la información del usuario
        this.perfilService.postUsuario(perfilData).subscribe(perfilResponse => {
          console.log('Datos del perfil guardados:', perfilResponse);
        });

        // Navega a la página de inicio de sesión
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}