import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private loading: boolean = false;

  setLoading(value: boolean): void {
    this.loading = value;
  }

  getLoading(): boolean {
    return this.loading;
  }}
