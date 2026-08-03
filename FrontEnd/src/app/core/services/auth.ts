import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  /**
   * Autentica o usuário consultando o back-end (POST /login), que valida
   * os dados cadastrados (usuário: admin / senha: 123456).
   */
  login(nome: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, { nome, senha });
  }
}
