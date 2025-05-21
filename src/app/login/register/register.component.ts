import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BringDataFromBackService } from 'src/app/services/bring-data-from-back.service';
import { User } from 'src/app/model/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  protected datosUser:User;

  constructor(
    private httpClient: BringDataFromBackService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.datosUser={nombre:"",correo:"",contrasena:""};
  }

  protected formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', Validators.required),
    confirmarContrasena: new FormControl('', Validators.required),

  });

  protected onSubmit() {

    if (this.formulario.valid) {
      if (this.formulario.get('contrasena')?.value === this.formulario.get('confirmarContrasena')?.value) {
        this.datosUser.nombre = this.formulario.get('nombre')!.value as string;
        this.datosUser.correo = this.formulario.get('correo')!.value as string;
        this.datosUser.contrasena = this.formulario.get('contrasena')!.value as string;

        this.httpClient.registerUser(this.datosUser).subscribe(
          {
            next: (response) => {

              if (response.correo) {
                this.toast.error(response.correo);
              }
              if (response.nombre) {
                this.toast.error(response.nombre);
              }
              if (response.succes) {
                this.toast.success(response.succes);
              }

            },
            error: (error) => {
              console.log("error en la peticion postUser", error);
            },
            complete: () => {
              console.log("peticion UserComplete");

              this.router.navigate(['']);
            }
          }
        );
      } else {
        this.toast.error("Las contraseñas no coinciden");

      }

    } else {

      const correoErrors = this.formulario.get('correo')?.errors;

      if (correoErrors?.['email']) {
        this.toast.error("Ingrese un formato valido de correo");
      } else {
        this.toast.error("Por favor llene todos los campos");
      }

    }

  }

  protected login(){
    this.router.navigate(['']);
  }

}
