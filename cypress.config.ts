import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { allureCypress } from 'allure-cypress/reporter';
import { defineConfig } from 'cypress';
import cypressOnFix from 'cypress-on-fix';
import 'dotenv/config';

const FRONT_URL = process.env.FRONT_URL ?? 'https://front.serverest.dev';
const API_URL = process.env.API_URL ?? 'https://serverest.dev';

async function setupNodeEvents(
  cypressOn: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // Permite que Cucumber e Allure registrem os mesmos eventos sem sobrescrita.
  const on = cypressOnFix(cypressOn);

  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  );

  allureCypress(on, config, {
    resultsDir: 'allure-results',
    environmentInfo: {
      Front: FRONT_URL,
      API: API_URL,
      Node: process.version,
      SO: process.platform,
    },
  });

  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: FRONT_URL,
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents,
    expose: {
      apiUrl: API_URL,
    },
  },
  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 10000,
  requestTimeout: 15000,
  video: false,
  screenshotOnRunFailure: true,
  retries: {
    runMode: 1,
    openMode: 0,
  },
});
