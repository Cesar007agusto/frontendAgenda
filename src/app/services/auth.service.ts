import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { Tokenpayload } from '../model/token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  mostrarNombreUser() {
    const token = localStorage.getItem('tokenJwt');

    if (!token) {
      console.log("token no disponible");
      this.toastr.info('Token no disponible');
      return "";
    } else {
      try {

        const payload: Tokenpayload = jwtDecode(token as string);
        return payload.nombre;

      } catch (error) {

        console.error('Token inválido:', error);
        return "";

      }

    }

  }



  cerrarSession() {
    this.toastr.info('Su sesion ha terminado');
    localStorage.removeItem('tokenJwt');
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }


}
