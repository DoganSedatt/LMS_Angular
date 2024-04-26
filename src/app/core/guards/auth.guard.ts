import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { jwtDecode } from 'jwt-decode';
import { JWT_ROLES } from '../constants/jwtAttributes';
import { retry } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  console.log("--------------------");
  const router = inject(Router);
  const tokenService = inject(TokenService);


  let token = tokenService.getToken();//Token servis'ten 'Token' değerini getir
  let hasToken = tokenService.hasToken();
  if (token == null) {
    router.navigateByUrl("/login");alert("Giriş lazım")
  }
 

  else {
    console.log("HasToken:", hasToken)
    let decodedToken = jwtDecode<any>(token);//Jwt'yi decode et ve değişkene at

    const expirationTime = new Date(decodedToken.exp * 1000);
    const currentTime = new Date(Date.now());
    console.log("Şuan:", currentTime.getHours() + ":" + currentTime.getMinutes())
    console.log("Geçerlilik süresi:", expirationTime.getHours() + ":" + expirationTime.getMinutes())
    if (expirationTime < currentTime) {
      console.log("Geçerlilik süresi bitti", expirationTime)
      tokenService.removeToken();
    };


    //------------------------------------------------------//

    let userRoles: string[] = decodedToken[JWT_ROLES];//Okunan jwt'den role değerlerini oku ve değişkene at

    console.log("Tokendan gelen rol:", userRoles);

    //------------------------------------------------------//

    //if (tokenService.hasToken()) return true;//Token değeri içinde bir değer var mı diye bakıyor

    let gerekliRol: string[] = route.data['requiredRoles'] || [];//route için gerekli rolleri oku.
    console.log("Gerekli rol:", gerekliRol);

    gerekliRol.forEach((role) => {
      if (userRoles.includes(role)) {
        console.log("true")
      }

      else {

        alert("Giriş lazım")
        console.log("false")
        router.navigateByUrl("/login");
      }

    });
  }

  return true;




}; 
