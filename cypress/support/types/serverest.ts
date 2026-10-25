export interface Usuario {
  nome: string;
  email: string;
  password: string;
  /** A API trafega este campo como string. */
  administrador: 'true' | 'false';
}

export interface UsuarioCadastrado extends Usuario {
  _id: string;
}

export interface Produto {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
}

export interface Credenciais {
  email: string;
  password: string;
}

export interface MensagemResponse {
  message: string;
}

export interface LoginResponse extends MensagemResponse {
  authorization: string;
}

export interface CadastroResponse extends MensagemResponse {
  _id: string;
}
