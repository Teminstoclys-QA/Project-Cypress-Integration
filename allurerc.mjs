import { defineConfig } from 'allure';

const FALHOU = ['failed', 'broken'];

export default defineConfig({
  name: 'ServeRest | Automação Cypress',
  output: './allure-report',

  historyPath: './allure-history/history.jsonl',

  categories: {
    // Avaliadas em ordem: vale a primeira regra correspondente.
    rules: [
      {
        name: 'Ambiente indisponível',
        matchers: {
          statuses: FALHOU,
          message: /ECONNREFUSED|ETIMEDOUT|ENOTFOUND|cy\.(request|visit)\(\) failed/,
        },
      },
      {
        name: 'Falha na pré-condição (massa de dados)',
        matchers: { statuses: FALHOU, message: /pré-condição/ },
      },
      {
        name: 'Quebra de contrato da API (JSON Schema)',
        matchers: { statuses: FALHOU, message: /Contrato .* inválido/ },
      },
      {
        name: 'Elemento não encontrado na tela',
        matchers: { statuses: FALHOU, message: /Expected to find element|never found it/ },
      },
      {
        name: 'Resultado diferente do esperado',
        matchers: { statuses: ['failed'] },
      },
    ],
  },

  plugins: {
    awesome: {
      options: {
        reportName: 'ServeRest | Automação Cypress',
        reportLanguage: 'pt',
        groupBy: ['epic', 'feature'],
        singleFile: true,
      },
    },
  },
});
