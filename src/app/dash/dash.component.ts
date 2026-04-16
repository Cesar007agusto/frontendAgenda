import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';


import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { ModalNotificationsComponent } from '../modal-notifications/modal-notifications.component';
import { CreateComponent } from '../create/create.component';
import { DeleteComponent } from '../delete/delete.component';
import { UploadXlsxComponent } from '../upload-xlsx/upload-xlsx.component';

import { BringDataFromBackService } from '../services/bring-data-from-back.service';
import { ShareDataService } from '../services/shareData.service';
import { AuthService } from '../services/auth.service';
import { Tarea } from '../model/tareas';
import { IsAdminService } from '../services/is-admin.service';
import { GetHourService } from '../services/get-hour.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})

export class DashComponent implements OnInit {

  public datos: Tarea[] = [];
  protected nombre: string = '';
  protected saludo: string = '';
  protected isPc: boolean = true;
  public menuAbierto = false;
  public isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private httpClient: BringDataFromBackService,
    private codTarea: ShareDataService,
    private toastr: ToastrService,
    protected authService: AuthService,
    protected validarRol:IsAdminService,
    protected obtenerHora:GetHourService

  ) {}


  ngOnInit() {
    
    this.isAdmin=this.validarRol.esAdmin();

    if (window.innerWidth <= 500) {
      this.isPc = false;
      console.log("isMovil value", this.isPc)
    }
    this.obtenerDatos();
    this.nombre = this.authService.mostrarNombreUser();
  }

  

  abrirMenu() {
    this.menuAbierto = true;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  obtenerDatos(): void {
    this.httpClient.getTask().subscribe(
      {
        next: (Response) => {

          this.datos = Response.tareas;
          console.log("array datos",this.datos);
          this.saludo=this.obtenerHora.getHour();

        }, error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      }
    )
  }

  

  descargarXlsx(): void {
    this.httpClient.downloadXlsx().subscribe(
      {

        next: (blob) => {
          saveAs(blob, 'ExcelAgenda.xlsx');
          console.log('Archivo descargado correctamente');

        },
        error: (err) => { console.error('Error recibido:', err) },

        complete: () => { console.log('¡Observable completado!') }
      }
    );

  }

  closeSession() {
    this.authService.cerrarSession();
  }


  //enviar codTarea
  enviarCodTarea(registro: any, event: Event) {
    
    this.codTarea.updateData(registro);
  }


  abrirModalEditar() {

    const dialogRef = this.dialog.open(ModalEditarComponent, {

      width: '350px'

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        console.log("afterClose: valor devuelto de close ", result)
        // if(peticion update fue lanzada){
        this.toastr.success('Tarea Editada');

        this.obtenerDatos(); // Recargar datos cuando se cierre el modal
      } else if (result === 0) {
        this.toastr.error('Error al editar la Tarea');
      }
    });


  }

  mostrarNotificaciones() {
    this.httpClient.showNotifications();
  }


  openModalNotifications() {
    const dialogRef = this.dialog.open(ModalNotificationsComponent, {
      width: '70%'
    });
  }

  
  openModalCreate() {
    const dialogo = this.dialog.open(CreateComponent, {
      width: '350px'
    }

    );

    dialogo.afterClosed().subscribe(result => {

      console.log('mostrando error back ', result);

      if (result === 1) {
        console.log("afterClose", result)

        this.toastr.success('Nueva Tarea Creada');

        this.obtenerDatos(); // Recargar datos cuando se cierre el modal
      } else if (result === 0) {

        this.toastr.error('Error al Crear la Tarea');
      }



    });

  }

  openModalDelete(tarea: any) {
    console.log("nombre ", tarea.nombre);
    console.log(" codTarea", tarea.codTarea);
    const dialogo = this.dialog.open(DeleteComponent, {
      width: '350px',
      data: tarea
    }

    );
    dialogo.afterClosed().subscribe(result => {

      if (result === 1) {

        this.toastr.success('Tarea Eliminada');
        this.obtenerDatos();

      }

    });


  }

  openModalUpload() {

    const dialogo = this.dialog.open(UploadXlsxComponent, {
      width: '350px'
    });

    dialogo.afterClosed().subscribe(result => {
      console.log("afterclose ", result)
      if (result === 1) {
        this.toastr.success('Arhivo cargado y leido');
        this.obtenerDatos();
      } else if (result === 0) {
        this.toastr.error('Error al cargar el archivo');
      }
    });

  }

  

}


