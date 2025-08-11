import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  cerrarSession() {
    this.toastr.info('Su sesion ha terminado');
    localStorage.removeItem('tokenJwt');
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }
}
