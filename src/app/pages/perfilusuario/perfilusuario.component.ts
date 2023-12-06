import { Component, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/services/share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css']
})
export class PerfilusuarioComponent implements OnDestroy {

  nombres: string = '';
  apellidos: string = '';
  email: string = '';
  imagen: string | null = null;

  private subscription: Subscription;

  constructor(private sharedService: SharedService) {
    this.subscription = this.sharedService.userData.subscribe(userData => {
      this.nombres = userData.nombres;
      this.apellidos = userData.apellidos;
      this.email = userData.email;
      this.imagen = userData.imagen;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

