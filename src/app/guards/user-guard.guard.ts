import { CanActivateFn } from '@angular/router';
//al parecer no se esta usando este codigo, el acceso por rol 
// se maneja con un *ngIf que valida el rol y muestra o no el boton

export const userGuardGuard: CanActivateFn = (route, state) => {
  //obtener el usuario
  const token = localStorage.getItem("tokenJwt");
  if(token){
    const payloadBase64 = token.split('.')[1];
    const payloadDecoded = atob(payloadBase64);
    const payload = JSON.parse(payloadDecoded);
    console.log("RolllES:", payload.rol);


  }

  return true;
};
