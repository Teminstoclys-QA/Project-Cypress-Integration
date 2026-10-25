import type { InterceptacaoApi } from '../types/cypress';
import type { CadastroResponse, Produto } from '../types/serverest';
import { BasePage } from './BasePage';

class CadastroProdutoPage extends BasePage {
  protected readonly path = '/admin/cadastrarprodutos';

  private readonly seletores = {
    nome: 'nome',
    preco: 'preco',
    descricao: 'descricao',
    quantidade: 'quantity',
    // Grafia conforme o data-testid da aplicação.
    cadastrar: 'cadastarProdutos',
  };

  preencherFormulario(produto: Produto): void {
    this.porTestId(this.seletores.nome).clear().type(produto.nome);
    this.porTestId(this.seletores.preco).clear().type(String(produto.preco));
    this.porTestId(this.seletores.descricao).clear().type(produto.descricao);
    this.porTestId(this.seletores.quantidade).clear().type(String(produto.quantidade));
  }

  cadastrarEAguardar(): InterceptacaoApi<CadastroResponse> {
    cy.intercept('POST', this.urlApi('/produtos')).as('postProduto');
    this.porTestId(this.seletores.cadastrar).click();
    return cy.wait('@postProduto');
  }
}

class ListaProdutosPage extends BasePage {
  protected readonly path = '/admin/listarprodutos';

  validarProdutoListado(produto: Produto): void {
    this.validarUrl(this.path);
    cy.contains('table tbody tr', produto.nome)
      .should('be.visible')
      .and('contain.text', String(produto.preco))
      .and('contain.text', String(produto.quantidade));
  }
}

export const cadastroProdutoPage = new CadastroProdutoPage();
export const listaProdutosPage = new ListaProdutosPage();
