import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService

  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('tokenJwt');

    let cloneRequest = request;

    if (token) {
      cloneRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })

    }

    return next.handle(cloneRequest).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        //token expirado
        this.authService.cerrarSession();
        
      }
      return throwError(() => error);
    }))
  }

}
