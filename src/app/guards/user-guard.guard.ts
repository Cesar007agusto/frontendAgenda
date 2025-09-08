import { CanActivateFn } from '@angular/router';

export const userGuardGuard: CanActivateFn = (route, state) => {
  //obtener el usuario
  const token = localStorage.getItem("tokenJwt");
  if(token){
    const payloadBase64 = token.split('.')[1];
    const payloadDecoded = atob(payloadBase64);
    const payload = JSON.parse(payloadDecoded);
    console.log("Rollll:", payload.rol);


  }

  return true;
};
