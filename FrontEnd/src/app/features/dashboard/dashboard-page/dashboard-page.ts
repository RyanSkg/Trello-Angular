import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Vehicle } from '../../../core/services/vehicle';
import { Veiculo } from '../../../core/models/veiculo.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: false,
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit, OnDestroy {
  private vehicleService = inject(Vehicle);

  // Lista completa de veículos vinda do back-end (GET /vehicles)
  veiculos = signal<Veiculo[]>([]);
  carregandoVeiculos = signal(false);

  // Busca por modelo (Passo 8)
  termoBuscaModelo = '';
  veiculosFiltrados = signal<Veiculo[]>([]);
  veiculoSelecionado = signal<Veiculo | null>(null);
  private buscaModelo$ = new Subject<string>();

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.carregandoVeiculos.set(true);
    this.vehicleService.getVehicles().subscribe({
      next: (veiculos) => {
        this.veiculos.set(veiculos);
        this.veiculosFiltrados.set(veiculos);
        this.carregandoVeiculos.set(false);
        this.selecionarVeiculo(veiculos[0]);
      },
      error: () => {
        this.veiculos.set([]);
        this.veiculosFiltrados.set([]);
        this.carregandoVeiculos.set(false);
      },
    });

    // RxJS: debounceTime + distinctUntilChanged + filter + map
    const subModelo = this.buscaModelo$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((termo) => termo !== null && termo !== undefined),
        map((termo) =>
          this.veiculos().filter((v) =>
            v.vehicle.toLowerCase().includes(termo.trim().toLowerCase())
          )
        )
      )
      .subscribe((resultado) => {
        this.veiculosFiltrados.set(resultado);
        const aindaExiste = resultado.some((v) => v.id === this.veiculoSelecionado()?.id);
        if (resultado.length && !aindaExiste) {
          this.selecionarVeiculo(resultado[0]);
        } else if (!resultado.length) {
          this.veiculoSelecionado.set(null);
        }
      });

    this.subscriptions.add(subModelo);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onBuscaModeloChange(termo: string): void {
    this.termoBuscaModelo = termo;
    if (!termo) {
      this.veiculosFiltrados.set(this.veiculos());
      return;
    }
    this.buscaModelo$.next(termo);
  }

  selecionarVeiculo(veiculo: Veiculo | undefined | null): void {
    if (!veiculo) return;
    this.veiculoSelecionado.set(veiculo);
  }
}
