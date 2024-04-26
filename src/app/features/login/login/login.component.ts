import { CommonModule } from '@angular/common';
import { Component, OnInit,} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../core/services/login.service';
import { Router } from '@angular/router';
import {  MatCardModule } from '@angular/material/card';
import { LoginResponse } from '../../../models/AccessToken';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
 constructor(private formBuilder : FormBuilder,
  private loginService:LoginService,
  private router:Router
 ){}
 
 
 loginForm = this.formBuilder.group({
  email:['',Validators.required],
  password:['',Validators.required],
  authenticatorCode:['string']
 });


 onLogin() {
   const email = this.loginForm.value.email!;
   const password = this.loginForm.value.password!;
   const authenticatorCode = this.loginForm.value.authenticatorCode!;
 
   this.loginService.Login(email, password, authenticatorCode).subscribe((result: LoginResponse) => {
     result.email=email;//Girişi yapan maili result nesnesi içindeki maile at
     console.log(result);
     localStorage.setItem('Token', result.accessToken.token);
    alert(result.email+" kullanıcısı giriş yaptı")
     this.router.navigateByUrl('/homepage');
   });
 }
}