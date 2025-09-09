import { Component, inject, Input, signal } from "@angular/core";
import { AuthService } from "../../Services/auth.service";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
    standalone : true,
    selector : 'app-login',
    imports : [ReactiveFormsModule],
    templateUrl : './login.component.html',
    styles : ``
})
export class LoginComponent {
    private authService = inject(AuthService);
    private fb = inject(FormBuilder);
    private routes = inject(Router);
    auth = this.authService.isLoggedIn();
     loginForm = this.fb.group({
        username : ['',Validators.required],
        password : ['',Validators.required]
     });

     cargando = signal(false);
     mensaje = signal<string | null>(null);

     onLogin(){
        if (this.loginForm.invalid) return;
        
        this.cargando.set(true);
        this.mensaje.set("Cargando...");

        this.authService.login(this.loginForm.value as {username: string,password : string}).subscribe({
            next : (msj) => {
                this.mensaje.set(msj);
                this.cargando.set(false);
                this.routes.navigateByUrl('/');
            },
            error : (ex) =>{
                this.mensaje.set(ex.message);
                this.cargando.set(false);
            }
        })

     }

}