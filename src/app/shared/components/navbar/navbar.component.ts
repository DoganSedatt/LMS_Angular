import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',

})
export class NavbarComponent {
constructor(private tokenService:TokenService,private router:Router){}

isLoggedIn():boolean{
  return this.tokenService.hasToken();//Token varsa true yoksa false dönecek.
}
logOut():void{
  this.tokenService.removeToken();
  this.router.navigateByUrl('/login');
}


}
