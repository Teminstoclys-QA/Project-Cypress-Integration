import type {
  CadastroResponse,
  MensagemResponse,
  Usuario,
  UsuarioCadastrado,
} from '../types/serverest';
import { BaseService } from './BaseService';

class UsuariosService extends BaseService {
  protected readonly endpoint = '/usuarios';

  cadastrar(usuario: Usuario): Cypress.Chainable<Cypress.Response<CadastroResponse>> {
    return this.request<CadastroResponse>('POST', '', { body: usuario });
  }

  buscarPorId(id: string): Cypress.Chainable<Cypress.Response<UsuarioCadastrado>> {
    return this.request<UsuarioCadastrado>('GET', `/${id}`);
  }

  excluir(id: string): Cypress.Chainable<Cypress.Response<MensagemResponse>> {
    return this.request<MensagemResponse>('DELETE', `/${id}`);
  }
}

export const usuariosService = new UsuariosService();
