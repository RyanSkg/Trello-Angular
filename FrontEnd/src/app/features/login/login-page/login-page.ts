import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private auth = inject(Auth);
  private router = inject(Router);

  nome = '';
  senha = '';
  carregando = signal(false);
  mensagemErro = signal('');

  onSubmit(): void {
    this.mensagemErro.set('');

    if (!this.nome || !this.senha) {
      this.mensagemErro.set('Informe usuário e senha.');
      return;
    }

    this.carregando.set(true);

    this.auth.login(this.nome, this.senha).subscribe({
      next: () => {
        this.carregando.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.carregando.set(false);
        this.mensagemErro.set(
          err?.error?.message ?? 'Não foi possível efetuar o login. Tente novamente.'
        );
      },
    });
  }
}
