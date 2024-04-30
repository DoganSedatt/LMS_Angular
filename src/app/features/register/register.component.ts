import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../core/services/register.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Register } from '../../models/register';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  constructor(private formBuilder : FormBuilder,
    private registerService:RegisterService)
    {}
    registerForm!:FormGroup;
   

     ngOnInit(): void {
      this.createRegisterForm();
    }

    createRegisterForm(){
      this.registerForm = this.formBuilder.group({
        firstName:['',[Validators.required]],
        lastName:['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
       });
    }
    onRegister(){
      this.registerService.Register(this.registerForm.value).subscribe(response=>{
        
        console.log(response);  
        console.log("Başarıyla eklendi.");
        alert(response.firstName+" "+response.lastName+" adlı kullanıcı başarıyla eklendi");
       });
    }

}
