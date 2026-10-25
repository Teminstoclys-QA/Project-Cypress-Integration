import { Given, When } from '@badeball/cypress-cucumber-preprocessor';

import { criarUsuarioViaApi, obterTokenViaApi } from '../../actions/preCondicoes';
import { contexto } from '../../context/cenario';
import { criarProduto } from '../../data/factories';
import { produtosService } from '../../services/ProdutosService';

Given('que estou autenticado na API como administrador', () => {
  criarUsuarioViaApi({ administrador: 'true' }).then(obterTokenViaApi);
});

Given('que estou autenticado na API como usuário comum', () => {
  criarUsuarioViaApi({ administrador: 'false' }).then(obterTokenViaApi);
});

function cadastrarProduto(token?: string): void {
  const produto = criarProduto();
  contexto.get().produto = produto;

  produtosService.cadastrar(produto, token).then((resposta) => {
    contexto.get().resposta = resposta;

    if (resposta.status === 201) {
      contexto.registrarProduto(resposta.body._id);
    }
  });
}

When('eu cadastro um novo produto via API', () => {
  cy.then(() => cadastrarProduto(contexto.get().token));
});

When('eu cadastro um novo produto via API sem token', () => {
  cadastrarProduto();
});
