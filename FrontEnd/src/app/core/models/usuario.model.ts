export interface Usuario {
  id: number | string
  nome: string
  senha: string
  email: string
}

// Retorno do endpoint POST /login (não inclui a senha)
export interface LoginResponse {
  id: number | string
  nome: string
  email: string
}

