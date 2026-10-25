import type { InterceptacaoApi } from '../types/cypress';
import type { CadastroResponse, Usuario } from '../types/serverest';
import { BasePage } from './BasePage';

class CadastroUsuarioPage extends BasePage {
  protected readonly path = '/cadastrarusuarios';

  private readonly seletores = {
    nome: 'nome',
    email: 'email',
    senha: 'password',
    administrador: 'checkbox',
    cadastrar: 'cadastrar',
  };

  preencherFormulario(usuario: Usuario): void {
    this.porTestId(this.seletores.nome).clear().type(usuario.nome);
    this.porTestId(this.seletores.email).clear().type(usuario.email);
    this.porTestId(this.seletores.senha).clear().type(usuario.password, { log: false });

    if (usuario.administrador === 'true') {
      this.porTestId(this.seletores.administrador).check();
    }
  }

  cadastrarEAguardar(): InterceptacaoApi<CadastroResponse> {
    cy.intercept('POST', this.urlApi('/usuarios')).as('postUsuario');
    this.porTestId(this.seletores.cadastrar).click();
    return cy.wait('@postUsuario');
  }
}

export const cadastroUsuarioPage = new CadastroUsuarioPage();
