import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { contexto } from '../../context/cenario';
import { MENSAGENS } from '../../constants/mensagens';
import { homeAdminPage } from '../../pages/HomePage';
import { loginPage } from '../../pages/LoginPage';

When('eu faço login pela tela com as credenciais do usuário', () => {
  cy.then(() => {
    const usuario = contexto.get().usuario!;

    loginPage.visitar();
    loginPage.preencherCredenciais(usuario);
    loginPage.submeterEAguardar().its('response.statusCode').should('eq', 200);
  });
});

When('eu faço login pela tela com senha incorreta', () => {
  cy.then(() => {
    const usuario = contexto.get().usuario!;

    loginPage.visitar();
    loginPage.preencherCredenciais({
      email: usuario.email,
      password: `${usuario.password}-errada`,
    });

    loginPage.submeterEAguardar().then(({ response }) => {
      expect(response?.statusCode).to.equal(401);
      expect(response?.body.message).to.equal(MENSAGENS.login.invalido);
    });
  });
});

Then('devo ser direcionado para o painel do administrador', () => {
  cy.then(() => homeAdminPage.validarCarregada(contexto.get().usuario!.nome));
});

Then('devo permanecer na tela de login', () => {
  loginPage.validarUrl('/login');
});
