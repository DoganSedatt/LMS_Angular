import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../core/services/login.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { LoginResponse } from '../../../models/AccessToken';
import { TokenService } from '../../../core/services/token.service';
import { jwtDecode } from 'jwt-decode';
import { Member } from '../../../models/member';
import { MemberService } from '../../../shared/services/member.service';
import { Response } from '../../../models/response';
import { JWT_MAIL } from '../../../core/constants/jwtAttributes';
import { AuthService } from '../../../shared/services/Auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private tokenService: TokenService,
    private memberService: MemberService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.getMembers();
    this.showPassword();
    this.applyWaves();
  }
  showPassword() {
    const checkbox = document.querySelector("show > input[type=checkbox]") as HTMLInputElement;
    
  const pswd = document.querySelector("input[type=password]");

  // Elemanlar null değilse işlemleri gerçekleştir
  if (checkbox && pswd) {
    checkbox.addEventListener("input", (e) => {
      // pswd ve checkbox null değilse ve pswd bir HTMLInputElement ise işlemleri gerçekleştir
      if (pswd instanceof HTMLInputElement) {
        pswd.type = checkbox.checked ? "text" : "password";
      } else {
        console.error("Password input element not found or incorrect type!");
      }
    });
  } else {
    console.error("Checkbox or password input element not found!");
  }
  }
  applyWaves() {
    const waves = document.querySelectorAll(".wave");
    waves.forEach((wave: any) => {
      for (let i = 0; i < wave.children.length; i++)
        wave.children[i].style.transitionDelay = `${i * 0.1}s`;
    });
  }

  userMailFound: boolean = false;
  userMail: string = '';
  emailList: string[] = [];
  memberList: Member[] = [];
  currentToken: any = this.tokenService.getToken();

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    authenticatorCode: ['string']
  });

  onLogin() {
    const email = this.loginForm.value.email?? '';
    const password = this.loginForm.value.password?? '';
    const authenticatorCode = this.loginForm.value.authenticatorCode?? '';

    this.loginService.Login(email, password, authenticatorCode).subscribe((result: LoginResponse) => {
      result.email = email;
      localStorage.setItem('Token', result.accessToken.token);
      alert(result.email + " kullanıcısı giriş yaptı")
      this.onMemberLog();
      this.router.navigateByUrl('/homepage');
    });
  }

  onMemberLog() {
    this.currentToken = this.tokenService.getToken();
    let gelenToken = jwtDecode<any>(this.currentToken);
    this.userMail = gelenToken[JWT_MAIL];
    console.log("userMail:", this.userMail);
    console.log("Mailler:", this.emailList);

    if (this.memberList.length > 0) {
      for (let i = 0; i < this.emailList.length; i++) {
        if (this.emailList[i] == this.userMail) {
          this.userMailFound = true;
          break;
        }
      }

      if (this.userMailFound) {
        console.log("userMail, emailList içinde bulunuyor.");
        for (let i = 0; i < this.memberList.length; i++) {
          if (this.memberList[i].email == this.userMail) {
            console.log("Şuan sistemde giriş yapmış kullanıcı:", this.userMail);
            this.authService.loggedInMember=this.memberList[i];
            console.log("Tüm bilgi:",this.authService.loggedInMember);
          }
        }
      } else {
        console.log("userMail, emailList içinde bulunmuyor.");
      }
    } else {
      console.log("Üye listesi henüz yüklenmedi.");
    }
  }

  getMembers() {
    this.memberService.getAll().subscribe((response: Response<Member>) => {
      this.memberList = response.items;
      console.log("MemberList:", this.memberList);
      this.memberList.forEach(t => {
        this.emailList.push(t.email);
      });
    });
  }
}
