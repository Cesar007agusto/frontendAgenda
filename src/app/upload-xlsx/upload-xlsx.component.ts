import { Component } from '@angular/core';
import { BringDataFromBackService } from '../services/bring-data-from-back.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-xlsx',
  templateUrl: './upload-xlsx.component.html',
  styleUrls: ['./upload-xlsx.component.css']
})
export class UploadXlsxComponent {

  private formData = new FormData();
  protected archivoSelected: any;
  protected respuestaServidor: any = {};

  constructor(
    private enviarExcel: BringDataFromBackService,
    private dialogRef: MatDialogRef<UploadXlsxComponent>,
  ) {

  }

  fileSelected(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.archivoSelected = archivo;
      this.formData.append('archivo.xlsx', archivo);

    }


  }

  sendExcel() {
    this.enviarExcel.uploadXlsx(this.formData).subscribe(
      {
        next: (respuesta) => {
          this.respuestaServidor = respuesta;
          console.log('Archivo enviado al backend ', this.respuestaServidor.succes);
          this.cerrarModal();
        },
        error: (err) => console.error('Error al enviar el archivo al backend', err)
      }
    );
  }

  cerrarModal() {
    console.log("cerrarNodal ", this.respuestaServidor.succes);
    this.dialogRef.close(this.respuestaServidor.succes);
  }

  sendExcelAndClose() {
    this.sendExcel();


  }



}
