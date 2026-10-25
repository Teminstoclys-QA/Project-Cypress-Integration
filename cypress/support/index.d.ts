import type { Credenciais } from './types/serverest';

declare global {
  namespace Cypress {
    interface Chainable {
      /** Login pela interface com cache de sessão (cy.session). */
      loginViaUi(credenciais: Credenciais): Chainable<void>;
    }
  }
}

export {};
