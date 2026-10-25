import type { CadastroResponse, MensagemResponse, Produto } from '../types/serverest';
import { BaseService } from './BaseService';

class ProdutosService extends BaseService {
  protected readonly endpoint = '/produtos';

  cadastrar(
    produto: Produto,
    token?: string,
  ): Cypress.Chainable<Cypress.Response<CadastroResponse>> {
    return this.request<CadastroResponse>('POST', '', {
      body: produto,
      headers: this.authHeader(token),
    });
  }

  excluir(id: string, token: string): Cypress.Chainable<Cypress.Response<MensagemResponse>> {
    return this.request<MensagemResponse>('DELETE', `/${id}`, {
      headers: this.authHeader(token),
    });
  }
}

export const produtosService = new ProdutosService();
