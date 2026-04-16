import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsAdminService {

  constructor() { }

  esAdmin(){
    const token = localStorage.getItem("tokenJwt");
  if(token){
    const payloadBase64 = token.split('.')[1];
    const payloadDecoded = atob(payloadBase64);
    const payload = JSON.parse(payloadDecoded);
    console.log("RollECITO:", payload.rol);
    if(payload.rol==='admin'){
      return true;
    }
    else{
      return false;
    }
  }
  return false;

  }


}
