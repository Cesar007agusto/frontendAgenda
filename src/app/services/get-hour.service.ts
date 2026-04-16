import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetHourService {
  constructor() {}

  getHour() {
    const hora = new Date().getHours();

    console.log('hora', hora);

    if (hora >= 19) {
      return 'Buenas noches';
    } else if (hora < 12) {
      return 'Buenos Días';
    } else {
      return 'Buenas Tardes';
    }
  }
}
