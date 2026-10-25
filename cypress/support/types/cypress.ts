import type { Interception } from 'cypress/types/net-stubbing';

export type InterceptacaoApi<TResposta> = Cypress.Chainable<Interception<unknown, TResposta>>;
