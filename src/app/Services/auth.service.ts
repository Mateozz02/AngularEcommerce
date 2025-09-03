import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { environment } from "../env";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromStorage());

  constructor(private http: HttpClient) {}

  // Observable para exponer el token
  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  // ------------------ LOGIN ------------------
  login(credencial: { username: string; password: string }): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credencial).pipe(
      tap(res => {
        const token = res.token;
        localStorage.setItem("authToken", token);
        this.tokenSubject.next(token);
      }),
      map(() => "✅ Login exitoso"), // mensaje de éxito
      catchError(err => {
        return throwError(() => new Error("❌ Error en login: " + (err.error?.message || "intente de nuevo")));
      })
    );
  }

  // ------------------ LOGOUT ------------------
  logout(): string {
    localStorage.removeItem("authToken");
    this.tokenSubject.next(null);
    return "👋 Sesión cerrada correctamente";
  }

  // ------------------ REGISTER ------------------
  register(datos: { username: string; password: string; email: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/users`, datos).pipe(
      map(() => "✅ Registro exitoso, ahora podés iniciar sesión"),
      catchError(err => {
        return throwError(() => new Error("❌ Error en registro: " + (err.error?.message || "intente de nuevo")));
      })
    );
  }

  // ------------------ UTILS ------------------
  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  private getTokenFromStorage(): string | null {
    return localStorage.getItem("authToken");
  }
}
