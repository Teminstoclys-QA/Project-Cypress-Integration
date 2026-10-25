import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { contexto } from '../../context/cenario';
import { MENSAGENS } from '../../constants/mensagens';
import { criarUsuario } from '../../data/factories';
import { cadastroUsuarioPage } from '../../pages/CadastroUsuarioPage';
import { homePage } from '../../pages/HomePage';
import type { MensagemResponse, Usuario } from '../../types/serverest';

function cadastrarPelaTela(usuario: Usuario): void {
  cadastroUsuarioPage.preencherFormulario(usuario);
  cadastroUsuarioPage.cadastrarEAguardar().then(({ response }) => {
    if (!response) throw new Error('POST /usuarios não retornou resposta.');

    contexto.get().resposta = { status: response.statusCode, body: response.body };
    if (response.statusCode === 201) {
      contexto.registrarUsuario(response.body._id);
    }
  });
}

Given('que estou na tela de cadastro de usuários', () => {
  cadastroUsuarioPage.visitar();
});

When('eu preencho o cadastro com dados válidos e confirmo', () => {
  cadastrarPelaTela(criarUsuario({ administrador: 'false' }));
});

When('eu preencho o cadastro com o mesmo e-mail e confirmo', () => {
  cy.then(() => cadastrarPelaTela(criarUsuario({ email: contexto.get().usuario!.email })));
});

Then('o cadastro deve ser concluído com sucesso', () => {
  cy.then(() => {
    const { status, body } = contexto.get().resposta!;
    expect(status).to.equal(201);
    expect((body as MensagemResponse).message).to.equal(MENSAGENS.usuario.cadastrado);
  });
});

Then('devo ser direcionado para a loja', () => {
  homePage.validarCarregada();
});
