import { BasePage } from './BasePage';

class HomePage extends BasePage {
  protected readonly path = '/home';

  validarCarregada(): void {
    this.validarUrl(this.path);
    cy.contains('h1', 'Serverest Store').should('be.visible');
  }
}

class HomeAdminPage extends BasePage {
  protected readonly path = '/admin/home';

  validarCarregada(nomeUsuario: string): void {
    this.validarUrl(this.path);
    cy.contains('h1', 'Bem Vindo').should('be.visible').and('contain.text', nomeUsuario);
  }
}

export const homePage = new HomePage();
export const homeAdminPage = new HomeAdminPage();
