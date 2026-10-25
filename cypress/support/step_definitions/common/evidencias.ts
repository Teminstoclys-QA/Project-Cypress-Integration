import { After, Before } from '@badeball/cypress-cucumber-preprocessor';
import * as allure from 'allure-js-commons';

import { contexto } from '../../context/cenario';

Before({ name: 'Classificar cenário no relatório' }, ({ gherkinDocument, pickle }) => {
  const tags = pickle.tags.map((t) => t.name.replace('@', ''));
  const ehApi = tags.includes('api');
  const feature = gherkinDocument.feature;

  allure.epic(ehApi ? 'API' : 'Front-end');
  allure.layer(ehApi ? 'API' : 'E2E');
  allure.feature(feature?.name ?? 'Sem funcionalidade');
  allure.story(pickle.name);
  allure.tags(...tags);
  allure.severity(tags.includes('smoke') ? 'critical' : 'normal');

  if (feature?.description) {
    allure.description(feature.description.trim().replace(/^\s+/gm, ''));
  }

  allure.link(
    ehApi ? `${Cypress.expose('apiUrl')}` : `${Cypress.config('baseUrl')}`,
    ehApi ? 'Documentação da API (Swagger)' : 'Aplicação testada',
  );
});

const nomeArquivo = (texto: string): string =>
  texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9-_ ]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();

After({ name: 'Evidência: print da tela', tags: '@e2e' }, ({ pickle }) => {
  cy.screenshot(`evidencia-${nomeArquivo(pickle.name)}`, { capture: 'viewport' });
});

After({ name: 'Evidência: resposta da API', tags: '@api' }, () => {
  cy.then(() => {
    const { resposta } = contexto.get();
    if (!resposta) return;

    allure.attachment(
      `Resposta da API (HTTP ${resposta.status})`,
      JSON.stringify(resposta.body, null, 2),
      'application/json',
    );
  });
});
