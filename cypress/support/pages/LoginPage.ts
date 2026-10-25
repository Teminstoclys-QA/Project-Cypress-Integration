import type { InterceptacaoApi } from '../types/cypress';
import type { Credenciais, LoginResponse } from '../types/serverest';
import { BasePage } from './BasePage';

class LoginPage extends BasePage {
  protected readonly path = '/login';

  private readonly seletores = {
    email: 'email',
    senha: 'senha',
    entrar: 'entrar',
    cadastrar: 'cadastrar',
  };

  preencherCredenciais({ email, password }: Credenciais): void {
    this.porTestId(this.seletores.email).clear().type(email);
    this.porTestId(this.seletores.senha).clear().type(password, { log: false });
  }

  submeterEAguardar(): InterceptacaoApi<LoginResponse> {
    cy.intercept('POST', this.urlApi('/login')).as('postLogin');
    this.porTestId(this.seletores.entrar).click();
    return cy.wait('@postLogin');
  }

  irParaCadastro(): void {
    this.porTestId(this.seletores.cadastrar).click();
  }
}

export const loginPage = new LoginPage();
