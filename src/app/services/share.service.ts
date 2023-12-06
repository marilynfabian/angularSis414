import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userDataSubject = new BehaviorSubject<any>({}); // Inicializa con un objeto vacío
  userData = this.userDataSubject.asObservable();


  

  setUserData(data: any) {
    this.userDataSubject.next(data);
  }

  private loading: boolean = false;

  setLoading(value: boolean): void {
    this.loading = value;
  }

  getLoading(): boolean {
    return this.loading;
  }}
