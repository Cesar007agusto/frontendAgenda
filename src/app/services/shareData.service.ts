import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private codTarea = new BehaviorSubject<any>({}); // Inicializamos con un valor vacío
  public currentData = this.codTarea.asObservable();  // Observable para escuchar cambios


constructor() { }

updateData(data: any) {
  this.codTarea.next(data); // Actualiza el valor del BehaviorSubject
}

}
