import { Component, OnInit } from '@angular/core';
import { BringDataFromBackService } from '../services/bring-data-from-back.service';

@Component({
  selector: 'app-modal-notifications',
  templateUrl: './modal-notifications.component.html',
  styleUrls: ['./modal-notifications.component.css']
})
export class ModalNotificationsComponent implements OnInit {

  protected notificaciones: any[] = [];
  protected mostrarNotificacion: boolean = false;


  constructor(
    private traerDatos: BringDataFromBackService
  ) { };

  async ngOnInit(): Promise<any> {

    await this.mostrarNotificaciones();

  }

  mostrarNotificaciones() {
    this.traerDatos.showNotifications().subscribe({
      next: (valor) => {
        this.notificaciones = valor;

        if (this.notificaciones.length > 0) {

          this.mostrarNotificacion = true;
        } else {
          console.log("no hay notificaciones");
          this.mostrarNotificacion = false;
        }
      },
      error: (err) => {
        console.error("error en la petición ", err);
      },
      complete: () => {
        console.log("Success");
      }
    })

  }



}
