import { Component, OnInit } from '@angular/core';
import { BringDataFromBackService } from '../services/bring-data-from-back.service';

@Component({
  selector: 'app-modal-notifications',
  templateUrl: './modal-notifications.component.html',
  styleUrls: ['./modal-notifications.component.css']
})
export class ModalNotificationsComponent implements OnInit {

  protected notificaciones: any[] = [];
  protected mostrar: boolean = false;


  constructor(
    private traerDatos: BringDataFromBackService
  ) { };

  async ngOnInit(): Promise<any> {
    
    await this.mostrarNotificaciones();
    
    if(this.notificaciones.length > 0){
      this.mostrar=true;
    }
  }

  async mostrarNotificaciones() {
    try {
      this.notificaciones = await this.traerDatos.showNotifications();
    } catch (error) {
      console.error('Error al mostrar notificaciones en modal-notifications:', error);
    }

  }



}
