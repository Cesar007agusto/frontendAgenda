import { Component, OnInit } from '@angular/core';
import { Tarea } from '../model/tareas'
import { Subscription } from 'rxjs';
import { BringDataFromBackService } from '../services/bring-data-from-back.service';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private suscription: Subscription;
  public datos: Tarea;
  private tmp: any;

  protected nombre: string = '';
  protected fecha: string = '';

  public respuestaServidor: any = {};




  constructor(
    private traerDatos: BringDataFromBackService,
    private dialogRef: MatDialogRef<CreateComponent>

  ) {
    this.datos = { codigo: 0, nombre: '', fecha: '', estado: '' };
    this.suscription = this.tmp;

  }

  ngOnInit() {

  }

  async crearTarea(): Promise<void> {
    try {
      const response = await firstValueFrom(this.traerDatos.createTask(this.datos));
      this.respuestaServidor = response;
      console.log('2:Respuesta backend crear exito', this.respuestaServidor.mensaje);

    } catch (err: any) {
      this.respuestaServidor = err.error;
      console.error('Error al crear la tarea:', err.message);
      console.log('2:Respuesta backend crear error', this.respuestaServidor.mensaje);
    }

  }

  cerrarModalCreate() {
    console.log("3:cerrando modal create... datos en close", this.respuestaServidor.mensaje);
    this.dialogRef.close(this.respuestaServidor.mensaje);

  }

  async createTaskAndClose() {
    if (this.nombre.trim() !== '' && this.fecha !== '') {
      console.log("1:lanzando peticion crearTarea")
      await this.crearTarea();


    }

    this.cerrarModalCreate();

  }



  //el unsuscribe interfiere con la respuesta del backend
  ngOnDestroy() {
    /*
    if(this.suscription){
      this.suscription.unsubscribe();
      console.log('Suscripción cerrada.');
    }*/
  }

}
