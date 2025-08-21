import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('tokenJwt');
  console.log("guard ejecutandose")
  if (token) {
    
    return true;
    
  } else {
  router.navigate(['']);   
  return false; 
  }
};
