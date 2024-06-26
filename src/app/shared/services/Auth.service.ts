import { Injectable } from '@angular/core';
import { Member } from '../../models/member';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  loggedInMember: Member | null = null;
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


