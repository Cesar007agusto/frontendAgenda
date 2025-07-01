import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('tokenJwt');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

}
