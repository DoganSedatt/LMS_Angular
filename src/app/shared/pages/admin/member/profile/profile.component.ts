import { Component } from '@angular/core';
import { AuthService } from '../../../../services/Auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
constructor(public authService:AuthService){
}


}
