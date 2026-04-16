import { Component} from '@angular/core';
import { Tarea } from '../model/tareas';
import { BringDataFromBackService } from '../services/bring-data-from-back.service';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

//PRUEBA SSH Y PGP
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent  {

  
  public datos: Tarea={codTarea: 0,codUsuario:0, nombre: '', fecha: '', estado: '' };
  protected nombre: string = '';
  protected fecha: string = '';
  public respuestaServidor: any = {};


  constructor(
    private httpClient: BringDataFromBackService,
    private dialogRef: MatDialogRef<CreateComponent>

  ) {
    

  }



  async crearTarea(): Promise<void> {
    try {
      const response = await firstValueFrom(this.httpClient.createTask(this.datos));
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


}
