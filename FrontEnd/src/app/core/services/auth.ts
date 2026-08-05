import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../models/usuario.model';

const STORAGE_KEY = 'ford_dashboard_usuario';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  /**
   * Autentica o usuário consultando o back-end (POST /login).
   * Em caso de sucesso, persiste os dados do usuário logado.
   */
  login(nome: string, senha: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, { nome, senha })
      .pipe(
        tap((usuario) => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
        })
      );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(STORAGE_KEY);
  }

  getUsuario(): LoginResponse | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
}
