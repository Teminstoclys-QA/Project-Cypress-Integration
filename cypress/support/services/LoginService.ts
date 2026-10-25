import type { Credenciais, LoginResponse } from '../types/serverest';
import { BaseService } from './BaseService';

class LoginService extends BaseService {
  protected readonly endpoint = '/login';

  login(credenciais: Credenciais): Cypress.Chainable<Cypress.Response<LoginResponse>> {
    return this.request<LoginResponse>('POST', '', { body: credenciais });
  }
}

export const loginService = new LoginService();
