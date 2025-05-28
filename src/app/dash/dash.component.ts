import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { ModalNotificationsComponent } from '../modal-notifications/modal-notifications.component';
import { Subscription } from 'rxjs';
import { BringDataFromBackService } from '../services/bring-data-from-back.service';
import { ShareDataService } from '../services/shareData.service';
import { ToastrService } from 'ngx-toastr';
import { CreateComponent } from '../create/create.component';
import { DeleteComponent } from '../delete/delete.component';
import { UploadXlsxComponent } from '../upload-xlsx/upload-xlsx.component'

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})

export class DashComponent implements OnInit {
  private suscripcion: Subscription;
  private tmp: any;
  public datos: any[] = [];



  constructor(
    private dialog: MatDialog,
    private traerDatos: BringDataFromBackService,
    private codTarea: ShareDataService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.suscripcion = this.tmp;
  }

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.suscripcion = this.traerDatos.getTask().subscribe(
      {
        next: (Response) => {
          this.datos = Response.tareas;

        }, error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      }
    )
  }

  descargarXlsx(): void {
    this.traerDatos.downloadXlsx().subscribe(
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

  closeSession(){
    localStorage.removeItem('tokenJwt');
    this.router.navigate(['/']);
  }



  //enviar codTarea
  enviarCodTarea(registro: any, event: Event) {
    console.log("datos registro ", registro.codTarea);
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
    this.traerDatos.showNotifications();
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
        // if(peticion update fue lanzada){
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

    dialogo.afterClosed().subscribe(result=>{
      console.log("afterclose ",result)
      if(result===1){
        this.toastr.success('Arhivo cargado y leido');
        this.obtenerDatos();
      }else if(result===0){
        this.toastr.error('Error al cargar el archivo');
      }
      
      

    });

  }

}
