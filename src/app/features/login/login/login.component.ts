import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../core/services/login.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { LoginResponse } from '../../../models/AccessToken';
import { TokenService } from '../../../core/services/token.service';
import { jwtDecode } from 'jwt-decode';
import { MemberListComponent } from '../../../shared/pages/admin/member/member-list/member-list.component';
import { Member } from '../../../models/member';
import { MemberService } from '../../../shared/services/member.service';
import { ResponseModel } from '../../../models/responseModel';
import { JWT_MAIL } from '../../../core/constants/jwtAttributes';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private tokenService: TokenService,
    private memberService: MemberService

  ) { }
  userMail: any;
  emailList: string[] = [];
  memberList!: Member[]
  currentToken: any = this.tokenService.getToken();
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    authenticatorCode: ['string']
  });

  onLogin() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    const authenticatorCode = this.loginForm.value.authenticatorCode!;

    this.loginService.Login(email, password, authenticatorCode).subscribe((result: LoginResponse) => {
      result.email = email;//Girişi yapan maili result nesnesi içindeki maile at
      console.log(result);
      localStorage.setItem('Token', result.accessToken.token);
      alert(result.email + " kullanıcısı giriş yaptı")
      this.onMemberLog();
      this.router.navigateByUrl('/homepage');
    });
  }
  onMemberLog() {
    this.currentToken = this.tokenService.getToken();//Tokeni değişkene at
    let gelenToken = jwtDecode<any>(this.currentToken);//Bu tokeni çöz içindeki bilgileri oku
    this.userMail = gelenToken[JWT_MAIL];//tokenin içindeki maili oku
    console.log("userMail:", this.userMail);
    this.getMembers();
    console.log("Mailler:", this.emailList);

  }
  getMembers() {//Üyeleri getir ve maillerini bir mail değişkeninde tut
    this.memberService.getAll().subscribe({
      next: (response: ResponseModel<Member>) => {
        console.log("MemberResponse:", response);
        this.memberList = response.items;
        this.memberList.forEach(t => {
          this.emailList.push(t.email);
        })
      }
    })
  }
}