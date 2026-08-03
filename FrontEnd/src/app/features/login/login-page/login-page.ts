import { Component, signal, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { LoginResponse } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private auth = inject(Auth);

  nome = '';
  senha = '';
  carregando = signal(false);
  mensagemErro = signal('');
  usuarioLogado = signal<LoginResponse | null>(null);

  onSubmit(): void {
    this.mensagemErro.set('');

    if (!this.nome || !this.senha) {
      this.mensagemErro.set('Informe usuário e senha.');
      return;
    }

    this.carregando.set(true);

    this.auth.login(this.nome, this.senha).subscribe({
      next: (usuario) => {
        this.carregando.set(false);
        this.usuarioLogado.set(usuario);
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
