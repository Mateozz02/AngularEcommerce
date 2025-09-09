import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styles: '',
  standalone : true,
})
export class RegisterComponent {
   private authService = inject(AuthService);
   private fb = inject(FormBuilder);
   private routes = inject(Router);

   RegisterForm = this.fb.group({
    username : ['',Validators.required],
    email : ['',Validators.email],
    password : ['',Validators.required],
   })
   mensaje = signal<string | null>(null);

   onRegister(){
    if(this.authService.isLoggedIn()) return this.mensaje.set("Ya iniciaste sesion");
    this.authService.register(this.RegisterForm.value as {username : string, password : string, email : string}).subscribe({
      next : msj => {
        this.mensaje.set(msj)
        this.routes.navigateByUrl('/login')
      },
      error : e => this.mensaje.set(e)
    })
   }
}
