import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DomManipulationService {
  initializeMenuBehavior() {
    const hamburguer = document.querySelector('.hamburger') as HTMLElement | null;
    const menu = document.querySelector('.menu-navegacion') as HTMLElement | null;

    console.log(menu);
    console.log(hamburguer);

    if (hamburguer && menu) {
      hamburguer.addEventListener('click', () => {
        menu.classList.toggle('spread');
      });

      window.addEventListener('click', (e) => {
        if (menu.classList.contains('spread') && e.target !== menu && e.target !== hamburguer) {
          menu.classList.toggle('spread');
        }
      });
    }
  }
}
