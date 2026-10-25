import type { Produto, Usuario } from '../types/serverest';

export interface RespostaHttp {
  status: number;
  body: unknown;
}

interface Cenario {
  usuario?: Usuario & { _id?: string };
  token?: string;
  produto?: Produto;
  resposta?: RespostaHttp;
  criados: {
    usuarios: string[];
    produtos: string[];
  };
}

const estadoInicial = (): Cenario => ({ criados: { usuarios: [], produtos: [] } });

let cenario: Cenario = estadoInicial();

export const contexto = {
  get: (): Cenario => cenario,
  reset: (): void => {
    cenario = estadoInicial();
  },
  registrarUsuario: (id: string): void => {
    cenario.criados.usuarios.push(id);
  },
  registrarProduto: (id: string): void => {
    cenario.criados.produtos.push(id);
  },
};
