import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShareDataService } from '../services/shareData.service';
import { Tarea } from '../model/tareas';
import { BringDataFromBackService } from '../services/bring-data-from-back.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit, OnDestroy {

  public camposTabla: Tarea = { codTarea: 0, codUsuario: 0, nombre: '', fecha: '', estado: '' };
  public respuestaServidor: any = {};


  constructor(
    private dialogRef: MatDialogRef<ModalEditarComponent>,
    private getCodTarea: ShareDataService,
    private editHttpClient: BringDataFromBackService
  ) { }


  protected formulario = new FormGroup({

    nombre: new FormControl(''),
    fecha: new FormControl(''),
    estado: new FormControl('')

  });


  //llamado desde boton guardar html
  async sendRequestAndClose() {


    if (this.formulario.get('nombre')?.value !== this.camposTabla.nombre
      || this.formulario.get('fecha')?.value !== this.convertirFecha(this.camposTabla.fecha)
      || this.formulario.get('estado')?.value !== this.camposTabla.estado) {

      await this.editarTarea();
    } else {
      this.cerrarModal();
    }

  }


  convertirFecha(fecha: string): string {
    const parte = fecha.split('/'); // Divide "08/01/2025" en ["08", "01", "2025"]
    return `${parte[2]}-${parte[1]}-${parte[0]}`; // Retorna "2025-01-08"
  }


  ngOnInit(): void {
    this.getCodTarea.currentData.subscribe(data => {
      this.camposTabla = data;

    });

    this.formulario.patchValue({
        nombre: this.camposTabla.nombre,
        fecha: this.convertirFecha(this.camposTabla.fecha),
        estado: this.camposTabla.estado
      });

  }

  ngOnDestroy(): void {

  }

  private async editarTarea() {
    const objTarea: Tarea = {
      codTarea: this.camposTabla.codTarea,
      codUsuario: 0,
      nombre: this.formulario.get('nombre')?.value || '',
      fecha: this.formulario.get('fecha')?.value || '',
      estado: this.formulario.get('estado')?.value || ''
    }
    this.editHttpClient.editTask(objTarea).subscribe(
      {
        next: (data) => {
          console.log("Respuesta backend ", data.respuesta);
          this.respuestaServidor = data.respuesta;
        },
        error: (err) => {
          console.error("error al editar tarea ", err);
          this.respuestaServidor = err;
        },
        complete: () => {
          console.log("suscribe completado");
          this.cerrarModal();
        }

      });
  }

  //llamado desde botones html
  cerrarModal() {
    //enviar valor de retorno al componente que lo abrio -->dash
    console.log("cerrando modal -> respuesta del Back", this.respuestaServidor);
    this.dialogRef.close(this.respuestaServidor);
  }

}
