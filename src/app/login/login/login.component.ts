import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BringDataFromBackService } from 'src/app/services/bring-data-from-back.service';
import { User } from 'src/app/model/user';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  protected datosUser: User;

  constructor(
    private router: Router,
    private httpClient: BringDataFromBackService,
    private toast: ToastrService
  ) {
    this.datosUser = { nombre: "", correo: "", contrasena: "" };
  }

  protected formulario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', Validators.required)
  });


  onSubmit() {
    if (this.formulario.valid) {
      this.datosUser.correo = this.formulario.get('correo')!.value as string;
      this.datosUser.contrasena = this.formulario.get('contrasena')!.value as string;

      this.httpClient.login(this.datosUser).subscribe(
        {
          next: (response) => {

            const jwt: string = response.token;
            
            localStorage.setItem('tokenJwt', jwt);
            this.router.navigate(['/dash']);

          },
          error: (error) => {
            console.error("error en la peticion login", error);
            this.toast.error('Credenciales no validas');
          },
          complete: () => {
            console.log("peticion LoginComplete");


          }
        }
      );
    } else {
      this.toast.error('Ingrese las credenciales de usuario')
    }

  }




  ingresarHomeApp() {
    // if(login){
    this.router.navigate(['/dash']);
    //}else{"ingrese usuario y contraseña"

  }

  goRegister() {
    this.router.navigate(['/register']);
  }


}