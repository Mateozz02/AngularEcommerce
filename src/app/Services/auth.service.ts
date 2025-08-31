import { Component, Injectable } from "@angular/core";
import {environment} from "../env"
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn : "root"})
export class AuthService{
    private apiUrl = `${environment.apiUrl}`;
    

    constructor(private http : HttpClient){}
    
     login(credencial : {username : string,password : string}){
        var url = `${this.apiUrl}/users`;
        return this.http.post(url,credencial).subscribe({
            next : res => {

            }
        })
    }

}
