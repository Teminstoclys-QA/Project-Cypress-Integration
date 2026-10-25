import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { criarUsuarioViaApi, obterTokenViaApi } from '../../actions/preCondicoes';
import { contexto } from '../../context/cenario';
import { criarProduto } from '../../data/factories';
import { cadastroProdutoPage, listaProdutosPage } from '../../pages/ProdutosPage';
import { produtosService } from '../../services/ProdutosService';
import type { Produto } from '../../types/serverest';

Given('que estou logado no front como administrador', () => {
  criarUsuarioViaApi({ administrador: 'true' }).then((admin) => {
    cy.loginViaUi(admin);
  });
});

Given('que estou na tela de cadastro de produtos', () => {
  cadastroProdutoPage.visitar();
});

Given('que já existe um produto cadastrado via API', () => {
  cy.then(() => {
    const produto = criarProduto();
    contexto.get().produto = produto;

    obterTokenViaApi(contexto.get().usuario!).then((token) => {
      produtosService.cadastrar(produto, token).then((resposta) => {
        expect(resposta.status, 'pré-condição: produto via API').to.equal(201);
        contexto.registrarProduto(resposta.body._id);
      });
    });
  });
});

function cadastrarPelaTela(produto: Produto): void {
  cadastroProdutoPage.preencherFormulario(produto);
  cadastroProdutoPage.cadastrarEAguardar().then(({ response }) => {
    if (!response) throw new Error('POST /produtos não retornou resposta.');

    contexto.get().resposta = { status: response.statusCode, body: response.body };
    if (response.statusCode === 201) {
      contexto.registrarProduto(response.body._id);
    }
  });
}

When('eu preencho o cadastro de produto com dados válidos e confirmo', () => {
  const produto = criarProduto();
  contexto.get().produto = produto;
  cadastrarPelaTela(produto);
});

When('eu preencho o cadastro de produto com o mesmo nome e confirmo', () => {
  cy.then(() => cadastrarPelaTela(criarProduto({ nome: contexto.get().produto!.nome })));
});

Then('o produto deve aparecer na listagem de produtos', () => {
  cy.then(() => {
    expect(contexto.get().resposta?.status, 'API respondeu ao front').to.equal(201);
    listaProdutosPage.validarProdutoListado(contexto.get().produto!);
  });
});
