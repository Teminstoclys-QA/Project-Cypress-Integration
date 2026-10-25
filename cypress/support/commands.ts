import { loginPage } from './pages/LoginPage';
import type { Credenciais } from './types/serverest';

// Comandos globais não acessam o contexto do cenário: o support file é empacotado separadamente dos specs.

Cypress.Commands.add('loginViaUi', (credenciais: Credenciais) => {
  cy.session(['login-ui', credenciais.email], () => {
    loginPage.visitar();
    loginPage.preencherCredenciais(credenciais);
    loginPage.submeterEAguardar();
    cy.location('pathname').should('not.include', '/login');
  });
});
