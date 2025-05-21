import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BringDataFromBackService } from '../services/bring-data-from-back.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit, OnDestroy {
  public nombreTarea: string = "";
  public codTarea: any = {};
  private suscription: Subscription;
  private tmp: any;
  private respuestaBackend:any={};

  constructor(
    private traerDatos: BringDataFromBackService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteComponent>,
    private toastr:ToastrService

  ) {
    this.suscription = this.tmp;
    this.nombreTarea = this.data.nombre;
  }




  ngOnInit() {

  }

  public eliminarTarea(): void {
    this.suscription = this.traerDatos.deleteTask(this.data.codTarea).subscribe(
      {
        next: (response) => {
          console.log("Tarea eliminada con éxito desde el front", response);
          this.respuestaBackend=response;
        },
        error: (error) => {
          this.respuestaBackend=error;
          console.error("Error eliminando la tarea", error);
          this.toastr.error('No se pudo eliminar la tarea')
          this.cerrarModalDelete();
        },
        complete: () => {
          console.log("Eliminación de tarea completada");
          this.cerrarModalDelete();
          
        }
      }

    )


  }

  cerrarModalDelete(){
    this.dialogRef.close(this.respuestaBackend.respuesta);
  }


  ngOnDestroy(): void {
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }


}
