import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Veiculo, VeiculosAPI } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class Vehicle {
  constructor(private http: HttpClient) {}

  /**
   * Busca a lista de veículos disponíveis (GET /vehicles).
   * Usa o operador "pluck" para extrair somente o array "vehicles" da resposta.
   */
  getVehicles(): Observable<Veiculo[]> {
    return this.http
      .get<VeiculosAPI>(`${environment.apiUrl}/vehicles`)
      .pipe(pluck('vehicles'));
  }
}
