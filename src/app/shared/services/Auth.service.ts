import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  constructor() { }

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true'); // Oturum durumunu localStorage'a kaydet
    
  }

  logout() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn'); // Oturum durumunu localStorage'dan kaldır
      localStorage.clear(); // Diğer localStorage verilerini temizle
    }
  }
  
  isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false' );
  }
}


