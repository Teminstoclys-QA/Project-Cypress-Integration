import { Then } from '@badeball/cypress-cucumber-preprocessor';

import { loginPage } from '../../pages/LoginPage';

Then('devo ver o alerta {string}', (mensagem: string) => {
  loginPage.alerta().should('be.visible').and('contain.text', mensagem);
});
