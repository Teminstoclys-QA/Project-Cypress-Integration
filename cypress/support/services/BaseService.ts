export abstract class BaseService {
  protected abstract readonly endpoint: string;

  protected request<T>(
    method: Cypress.HttpMethod,
    path = '',
    options: Partial<Cypress.RequestOptions> = {},
  ): Cypress.Chainable<Cypress.Response<T>> {
    return cy.request<T>({
      method,
      url: `${Cypress.expose('apiUrl')}${this.endpoint}${path}`,
      // Permite validar respostas 4xx nos cenários negativos.
      failOnStatusCode: false,
      ...options,
    });
  }

  protected authHeader(token?: string): Record<string, string> {
    return token ? { Authorization: token } : {};
  }
}
