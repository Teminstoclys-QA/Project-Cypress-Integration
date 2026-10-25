export abstract class BasePage {
  protected abstract readonly path: string;

  visitar(): void {
    cy.visit(this.path);
  }

  protected porTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-testid="${testId}"]`);
  }

  protected urlApi(endpoint: string): string {
    return `${Cypress.expose('apiUrl')}${endpoint}`;
  }

  alerta(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.alert');
  }

  validarUrl(trecho: string): void {
    cy.location('pathname').should('include', trecho);
  }
}
